import requests
import time
import base64

# OAuth2.0 Token
TOKEN_URL = "http://127.0.0.1:5000/oauth/token"
CLIENT_ID = "client_id"
CLIENT_SECRET = "client_secret"
SCOPES = "read_logs write_logs"

def get_oauth_token():
    """Fetch OAuth2.0 access token."""
    response = requests.post(TOKEN_URL, data={
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "scope": SCOPES
    })
    response.raise_for_status()
    return response.json()["access_token"]

# Jira details
JIRA_BASE_URL = "https://your-domain.atlassian.net"
PROJECT_KEY = "QA"
EMAIL = "your-email@example.com"
API_TOKEN = "your-api-token"

JIRA_HEADERS = {
    "Authorization": f"Basic {base64.b64encode(f'{EMAIL}:{API_TOKEN}'.encode()).decode()}",
    "Content-Type": "application/json"
}

def fetch_logs(access_token):
    """Fetch logs from the server."""
    url = "http://127.0.0.1:5000/get_logs"
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()

def sync_logs_with_jira(logs):
    """Sync logs with Jira."""
    for log in logs:
        test_id = log["test_id"]
        status = log["status"]
        description = log["description"]

        # Search Jira
        response = requests.get(
            f"{JIRA_BASE_URL}/rest/api/3/search",
            headers=JIRA_HEADERS,
            params={"jql": f"summary ~ '{test_id}'"}
        )
        issues = response.json().get("issues", [])
        if issues:
            # Update existing Jira ticket
            issue_id = issues[0]["id"]
            requests.put(
                f"{JIRA_BASE_URL}/rest/api/3/issue/{issue_id}",
                headers=JIRA_HEADERS,
                json={"fields": {"description": f"Updated: {description}\nStatus: {status}"}}
            )
        else:
            # Create a new Jira ticket
            requests.post(
                f"{JIRA_BASE_URL}/rest/api/3/issue",
                headers=JIRA_HEADERS,
                json={
                    "fields": {
                        "project": {"key": PROJECT_KEY},
                        "summary": f"Test {test_id} failed - Status: {status}",
                        "description": description,
                        "issuetype": {"name": "Bug"},
                        "labels": ["automation", "QA"]
                    }
                }
            )

# Hourly Job
def job():
    """Fetch logs and sync with Jira every hour."""
    token = get_oauth_token()
    logs = fetch_logs(token)
    sync_logs_with_jira(logs)

# Run job every hour
while True:
    job()
    time.sleep(3600)  # Wait for 1 hour
