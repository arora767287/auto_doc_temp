from flask import Flask, request, redirect, jsonify
import requests
import os
import time
import schedule
from urllib.parse import urlencode
import threading
import logging

# Flask App Setup
app = Flask(__name__)
app.secret_key = "a_secure_random_secret_key"

# Configure logging
logging.basicConfig(filename='ticket_sync.log', level=logging.INFO, format='%(asctime)s - %(message)s')

# OAuth2.0 and API Constants
JIRA_BASE_URL = "https://pepprai.atlassian.net/rest/api/3"
OAUTH_AUTHORIZE_URL = "https://auth.atlassian.com/authorize"
OAUTH_TOKEN_URL = "https://auth.atlassian.com/oauth/token"
CLIENT_ID = "PcV8HgR90kqRJS12euBLoYhJ8J7jt1TO"
CLIENT_SECRET = "ATOAylK_hlX9dbtyvg9tYHIV0t9IFjkPH8t2_7Z0SjtyeljhX5b64fSWKBbWaZm-MkG0520FF758"
REDIRECT_URI = "http://127.0.0.1:5000/callback"
SCOPES = "read:jira-work read:jira-user read:confluence-space.summary read:confluence-content.all write:jira-work offline_access"
PROJECT_KEY = "QA"

# Global token storage
token_store = {}

@app.route('/')
def home():
    return '''<a href="/auth">Authenticate with Jira</a>'''

@app.route('/auth')
def auth():
    query_params = {
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "response_type": "code",
        "scope": SCOPES,
        "state": "random_state_string"
    }
    auth_url = f"{OAUTH_AUTHORIZE_URL}?{urlencode(query_params)}"
    return redirect(auth_url)

@app.route('/callback')
def callback():
    code = request.args.get("code")
    if not code:
        return "Error: Missing code parameter.", 400

    # Exchange authorization code for access token
    response = requests.post(
        OAUTH_TOKEN_URL,
        headers={"Content-Type": "application/json"},
        json={
            "grant_type": "authorization_code",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "code": code,
            "redirect_uri": REDIRECT_URI
        }
    )

    if response.status_code != 200:
        return f"Error fetching access token: {response.text}", 500

    data = response.json()
    token_store['access_token'] = data.get("access_token")
    token_store['refresh_token'] = data.get("refresh_token")
    token_store['granted_scopes'] = data.get("scope")

    # Verify granted scopes
    granted_scopes = token_store.get('granted_scopes', "")
    print(granted_scopes)
    if "write:jira-work" not in granted_scopes:
        return "Error: The required 'write:jira-work' scope was not granted.", 403

    print("Access Token:", token_store['access_token'])
    print("Granted Scopes:", granted_scopes)

    return "Authentication successful! Access token and scopes stored."

# Mock Logs for Testing
MOCK_LOGS = [
    {"test_id": "TC001", "status": "FAIL", "description": "Timeout error during login test."},
    {"test_id": "TC002", "status": "PASS", "description": "Login test passed successfully."},
    {"test_id": "TC003", "status": "ERROR", "description": "NullPointerException at Checkout.java:42"}
]

# Fetch Logs (Mocked for Testing)
def fetch_server_logs():
    """Fetch mock logs for testing purposes."""
    print("Fetching mock logs...")
    return MOCK_LOGS

# Refresh token function
def refresh_token():
    refresh_token = token_store.get('refresh_token')
    if not refresh_token:
        raise Exception("Refresh token not available.")

    response = requests.post(
        OAUTH_TOKEN_URL,
        headers={"Content-Type": "application/json"},
        json={
            "grant_type": "refresh_token",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "refresh_token": refresh_token
        }
    )

    if response.status_code != 200:
        raise Exception(f"Error refreshing token: {response.text}")

    data = response.json()
    token_store['access_token'] = data.get("access_token")
    token_store['refresh_token'] = data.get("refresh_token")
    print(f"Token refreshed successfully. New access token: {token_store['access_token']}")


# Jira API Functions
def search_jira(test_id, description):
    access_token = token_store.get('access_token')  # Fixed to use access token
    if not access_token:
        raise Exception("Access token not available. Please authenticate first.")

    url = f"{JIRA_BASE_URL}/search"
    headers = {"Authorization": f"Bearer {access_token}"}
    jql_query = (
        f"summary ~ '{test_id}' OR "
        f"description ~ '{description[:50]}' OR "
        f"labels in ('automation', 'QA')"
    )
    params = {"jql": jql_query}

    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 401:  # Handle token expiration
        logging.info("Access token expired. Refreshing...")
        refresh_token()
        headers["Authorization"] = f"Bearer {token_store['access_token']}"
        response = requests.get(url, headers=headers, params=params)

    response.raise_for_status()
    issues = response.json().get("issues", [])
    return issues[0] if issues else None

def create_jira_ticket(test_id, status, description):
    access_token = token_store.get('access_token')
    if not access_token:
        raise Exception("Access token not available. Please authenticate first.")

    url = f"{JIRA_BASE_URL}/issue"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    payload = {
        "fields": {
            "project": {"key": PROJECT_KEY},
            "summary": f"Test {test_id} failed - Status: {status}",
            "description": description,
            "issuetype": {"name": "Bug"},
            "labels": ["automation", "QA"]
        }
    }
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 401:  # Handle token expiration
        print("Access token expired. Refreshing...")
        refresh_token()
        headers["Authorization"] = f"Bearer {token_store['access_token']}"
        response = requests.post(url, headers=headers, json=payload)

    response.raise_for_status()
    ticket_key = response.json()['key']
    print(f"Created Jira ticket: {ticket_key}\n")
    logging.info(f"Created Jira ticket: {ticket_key} for test {test_id}")
    return ticket_key

def update_jira_ticket(issue_id, status, description):
    access_token = token_store.get('access_token')
    if not access_token:
        raise Exception("Access token not available. Please authenticate first.")

    url = f"{JIRA_BASE_URL}/issue/{issue_id}"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    payload = {
        "fields": {
            "description": f"Updated: {description}\nStatus: {status}"
        }
    }
    response = requests.put(url, headers=headers, json=payload)
    if response.status_code == 401:  # Handle token expiration
        print("Access token expired. Refreshing...")
        refresh_token()
        headers["Authorization"] = f"Bearer {token_store['access_token']}"
        response = requests.put(url, headers=headers, json=payload)

    response.raise_for_status()
    print(f"Updated Jira ticket: {issue_id}\n")
    logging.info(f"Updated Jira ticket: {issue_id} with status {status}")

# Sync Logs with Jira
def sync_logs_with_jira():
    logs = fetch_server_logs()
    ticket_actions = []

    for log in logs:
        test_id = log.get("test_id")
        status = log.get("status")
        description = log.get("description")

        try:
            existing_ticket = search_jira(test_id, description)
            if existing_ticket:
                issue_id = existing_ticket["id"]
                update_jira_ticket(issue_id, status, description)
                ticket_actions.append({"test_id": test_id, "action": "updated", "issue_id": issue_id})
            else:
                ticket_key = create_jira_ticket(test_id, status, description)
                ticket_actions.append({"test_id": test_id, "action": "created", "issue_id": ticket_key})
        except Exception as e:
            error_message = f"Error processing test {test_id}: {e}"
            logging.error(error_message)
            ticket_actions.append({"test_id": test_id, "action": "error", "error": str(e)})

    return ticket_actions

@app.route('/run-job', methods=['GET'])
def run_job():
    """Endpoint to manually trigger the job function."""
    try:
        print("Manually triggered job via /run-job...")
        ticket_actions = sync_logs_with_jira()
        return jsonify({"status": "success", "message": "Job executed successfully.", "details": ticket_actions}), 200
    except Exception as e:
        print(f"Error while running job: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/debug-session', methods=['GET'])
def debug_session():
    return jsonify({
        "access_token": token_store.get('access_token'),
        "refresh_token": token_store.get('refresh_token'),
        "granted_scopes": token_store.get('granted_scopes')
    })

# Scheduler Job
def job():
    print("Starting log sync...")
    sync_logs_with_jira()
    print("Log sync completed.")

# Schedule the Job
schedule.every(5).seconds.do(job)  # Changed to 5 seconds for testing

if __name__ == '__main__':
    print("Starting Flask app...")
    app.run(debug=True, port=5000)
    # # Run the scheduler in a background thread
    # def run_scheduler():
    #     while True:
    #         schedule.run_pending()
    #         time.sleep(1)  # Wait for 1 second between checks

    # scheduler_thread = threading.Thread(target=run_scheduler, daemon=True)
    # scheduler_thread.start()

    # app.run(debug=True, port=5000, ssl_context=('cert.pem', 'key.pem'))
