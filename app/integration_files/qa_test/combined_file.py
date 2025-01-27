from flask import Flask, request, redirect, session, jsonify
import requests
import os
import time
import schedule
from urllib.parse import urlencode

# Flask App Setup
app = Flask(__name__)
app.secret_key = "a_secure_random_secret_key"

# OAuth2.0 and API Constants
JIRA_BASE_URL = "https://your-domain.atlassian.net/rest/api/3"
OAUTH_AUTHORIZE_URL = "https://auth.atlassian.com/authorize"
OAUTH_TOKEN_URL = "https://auth.atlassian.com/oauth/token"
CLIENT_ID = "bpkmj89vtxgs7rB25JVnrBlTZqIrfCOG"
CLIENT_SECRET = "ATOA-cG2RRKra0DJO7Bufku_JJiIbHEZvmJmyARNjgOaDpajURhY3h6VqT2_Hl6q5aFS0A5108D0"
REDIRECT_URI = "https://127.0.0.1:5000/callback"
SCOPES = "read:jira-work write:jira-work"
PROJECT_KEY = "QA"
SERVER_URL = "https://your-server.com/get_logs"
SERVER_USERNAME = "your_server_username"
SERVER_PASSWORD = "your_server_password"

# Temporary Token Storage (Use a secure database in production)
tokens = {}

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
    session['access_token'] = data.get("access_token")
    session['refresh_token'] = data.get("refresh_token")
    session['granted_scopes'] = data.get("scope")

    # Verify granted scopes
    granted_scopes = session.get('granted_scopes', "")
    if "write:jira-work" not in granted_scopes:
        return "Error: The required 'write:jira-work' scope was not granted.", 403

    print("Access Token:", session['access_token'])
    print("Granted Scopes:", granted_scopes)

    return "Authentication successful! Access token and scopes stored."

# Fetch Logs from Server
def fetch_server_logs():
    response = requests.get(SERVER_URL, auth=(SERVER_USERNAME, SERVER_PASSWORD))
    response.raise_for_status()
    logs = response.json()  # Assuming the server returns logs in JSON format
    return logs

# Jira API Functions
def search_jira(test_id, description):
    access_token = session.get('access_token')
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
    response.raise_for_status()
    issues = response.json().get("issues", [])
    return issues[0] if issues else None

def create_jira_ticket(test_id, status, description):
    access_token = session.get('access_token')
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
    response.raise_for_status()
    print(f"Created Jira ticket: {response.json()['key']}")

def update_jira_ticket(issue_id, status, description):
    access_token = session.get('access_token')
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
    response.raise_for_status()
    print(f"Updated Jira ticket: {issue_id}")

# Sync Logs with Jira
def sync_logs_with_jira():
    logs = fetch_server_logs()

    for log in logs:
        test_id = log.get("test_id")
        status = log.get("status")
        description = log.get("description")

        existing_ticket = search_jira(test_id, description)

        if existing_ticket:
            issue_id = existing_ticket["id"]
            update_jira_ticket(issue_id, status, description)
        else:
            create_jira_ticket(test_id, status, description)

# Scheduler Job
def job():
    print("Starting log sync...")
    sync_logs_with_jira()
    print("Log sync completed.")

# Schedule the Job
schedule.every(1).hours.do(job)

if __name__ == '__main__':
    app.run(debug=True, port=5000, ssl_context=('cert.pem', 'key.pem'))