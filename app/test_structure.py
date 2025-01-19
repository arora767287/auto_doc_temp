from flask import Flask, request, jsonify, redirect, session
import requests
import os
from urllib.parse import urlencode

app = Flask(__name__)
app.secret_key = "a361b70d12e2d11d2fe6da2431b17e1a"

SLACK_CLIENT_ID = "8021694719730.8287936828583"
SLACK_CLIENT_SECRET = "a361b70d12e2d11d2fe6da2431b17e1a"
REDIRECT_URI = os.getenv("REDIRECT_URI", "https://127.0.0.1:5000/callback")
BASE_URL = "https://slack.com/api"

ATLASSIAN_CLIENT_ID = "PcV8HgR90kqRJS12euBLoYhJ8J7jt1TO"
ATLASSIAN_CLIENT_SECRET = "ATOAylK_hlX9dbtyvg9tYHIV0t9IFjkPH8t2_7Z0SjtyeljhX5b64fSWKBbWaZm-MkG0520FF758"
ATLASSIAN_REDIRECT_URI = os.getenv("ATLASSIAN_REDIRECT_URI", "https://127.0.0.1:5000/atlassian_callback")

GITHUB_CLIENT_ID = "your_github_client_id"
GITHUB_CLIENT_SECRET = "your_github_client_secret"
GITHUB_REDIRECT_URI = os.getenv("GITHUB_REDIRECT_URI", "https://127.0.0.1:5000/github_callback")
GITHUB_API_BASE_URL = "https://api.github.com"

# Temporary storage for tokens. Replace with a database in production.
tokens = {}
workspaces = {}

# Unified data structure
def structure_data(source, content_type, content):
    return {
        "source": source,
        "content_type": content_type,
        "content": content
    }

@app.route('/')
def home():
    return '''
        <a href="/auth">Sign in with Slack</a><br>
        <a href="/atlassian_auth">Sign in with Jira/Confluence</a><br>
        <a href="/github_auth">Sign in with GitHub</a><br>
        <a href="/request_access/user">Request Access to Another User's Atlassian Account</a>
    '''

@app.route('/auth')
def auth():
    query_params = {
        "client_id": SLACK_CLIENT_ID,
        "scope": "channels:history,im:history,mpim:history,groups:history,users:read,team:read,channels:read,groups:read,mpim:read,im:read,channels:manage",
        "redirect_uri": REDIRECT_URI
    }
    auth_url = f"https://slack.com/oauth/v2/authorize?{urlencode(query_params)}"
    return redirect(auth_url)

@app.route('/callback')
def callback():
    code = request.args.get("code")
    if not code:
        return "Error: Missing code parameter.", 400

    response = requests.post(f"{BASE_URL}/oauth.v2.access", data={
        "client_id": SLACK_CLIENT_ID,
        "client_secret": SLACK_CLIENT_SECRET,
        "code": code,
        "redirect_uri": REDIRECT_URI
    })
    if response.status_code != 200:
        return "Error: Failed to fetch access token.", 500

    data = response.json()
    print(data)

    if not data.get("ok"):
        return f"Error during token exchange: {data.get('error')}", 400

    user_id = data.get('authed_user', {}).get('id')
    access_token = data.get('access_token')
    team_id = data.get('team', {}).get('id')
    team_name = data.get('team', {}).get('name')

    tokens[user_id] = access_token
    workspaces[team_id] = {
        "team_name": team_name,
        "access_token": access_token
    }

    print(workspaces)

    print(data.get("scope"))

    return f"Authentication successful for team {team_name}! Access token stored."

@app.route('/fetch_messages')
def fetch_messages():
    team_id = request.args.get("team_id")
    if not team_id or team_id not in workspaces:
        return "Error: Workspace not authenticated.", 403

    access_token = workspaces[team_id]["access_token"]
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    # Fetch list of all channels
    channels_response = requests.get(f"{BASE_URL}/conversations.list", headers=headers)
    if channels_response.status_code != 200:
        return "Error: Failed to fetch channels.", 500

    channels_data = channels_response.json()
    if not channels_data.get("ok"):
        return f"Error fetching channels: {channels_data.get('error')}", 400

    messages = []
    for channel in channels_data.get("channels", []):
        channel_id = channel.get("id")
        is_member = channel.get("is_member", False)

        # Auto-join the channel if the bot is not a member
        if not is_member:
            join_response = requests.post(f"{BASE_URL}/conversations.join", headers=headers, json={"channel": channel_id})
            join_data = join_response.json()
            if not join_data.get("ok"):
                continue

        # Fetch message history
        history_response = requests.get(f"{BASE_URL}/conversations.history", params={"channel": channel_id}, headers=headers)
        if history_response.status_code != 200:
            continue

        history_data = history_response.json()
        if not history_data.get("ok"):
            continue

        for message in history_data.get("messages", []):
            messages.append(structure_data("Slack", "message", {
                "channel": channel_id,
                "user": message.get("user"),
                "text": message.get("text"),
                "timestamp": message.get("ts")
            }))

    return jsonify(messages)

@app.route('/atlassian_auth')
def atlassian_auth():
    query_params = {
        "client_id": ATLASSIAN_CLIENT_ID,
        "redirect_uri": ATLASSIAN_REDIRECT_URI,
        "response_type": "code",
        "scope": "read:jira-work read:jira-user read:confluence-space.summary read:confluence-content.all offline_access",
        "state": "random_state_string"
    }
    auth_url = f"https://auth.atlassian.com/authorize?{urlencode(query_params)}"
    return redirect(auth_url)

@app.route('/atlassian_callback')
def atlassian_callback():
    code = request.args.get("code")
    requester = request.args.get("requester")
    if not code:
        return "Error: Missing code parameter.", 400

    # Exchange the authorization code for an access token
    response = requests.post(
        "https://auth.atlassian.com/oauth/token",
        headers={"Content-Type": "application/json"},
        json={
            "grant_type": "authorization_code",
            "client_id": ATLASSIAN_CLIENT_ID,
            "client_secret": ATLASSIAN_CLIENT_SECRET,
            "code": code,
            "redirect_uri": ATLASSIAN_REDIRECT_URI
        }
    )

    if response.status_code != 200:
        return f"Error fetching access token: {response.text}", 500

    data = response.json()
    print("Atlassian API response:", data)  # Debug output

    access_token = data.get("access_token")
    refresh_token = data.get("refresh_token")
    granted_scopes = data.get("scope")  # Capture granted scopes

    # Fetch cloud_id using accessible-resources endpoint
    headers = {"Authorization": f"Bearer {access_token}"}
    resources_response = requests.get("https://api.atlassian.com/oauth/token/accessible-resources", headers=headers)
    if resources_response.status_code != 200:
        return f"Error fetching accessible resources: {resources_response.text}", 500

    resources = resources_response.json()
    print("Accessible resources:", resources)  # Debug output

    # Assume the first resource's cloud_id for simplicity
    cloud_id = resources[0]["id"] if resources else None

    # Store tokens and cloud_id securely
    if requester:
        tokens[requester] = {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "cloud_id": cloud_id,
            "granted_scopes": granted_scopes  # Store granted scopes
        }
    else:
        session['atlassian_access_token'] = access_token
        session['atlassian_refresh_token'] = refresh_token
        session['cloud_id'] = cloud_id
    print("Current Tokens")
    print(tokens)

    return "Atlassian authentication successful! Access token and cloud_id stored."

@app.route('/fetch_jira_issues/<user>', methods=['GET'])
def fetch_jira_issues(user):
    user_data = tokens.get(user)
    if not user_data:
        return f"Error: No data available for user {user}.", 404

    access_token = user_data.get("access_token")
    cloud_id = user_data.get("cloud_id")
    if not access_token or not cloud_id:
        return "Error: User not authenticated with Atlassian.", 403

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Accept": "application/json"
    }

    response = requests.get(f"https://api.atlassian.com/ex/jira/{cloud_id}/rest/api/3/search", headers=headers)
    if response.status_code != 200:
        return f"Error fetching Jira issues: {response.text}", response.status_code

    issues = response.json()
    structured_issues = [
        structure_data("Jira", "issue", {
            "id": issue.get("id"),
            "key": issue.get("key"),
            "summary": issue.get("fields", {}).get("summary"),
            "description": issue.get("fields", {}).get("description")
        })
        for issue in issues.get("issues", [])
    ]

    return jsonify(structured_issues)

@app.route('/fetch_confluence_pages/<user>', methods=['GET'])
def fetch_confluence_pages(user):
    user_data = tokens.get(user)
    if not user_data:
        return f"Error: No data available for user {user}.", 404

    access_token = user_data.get("access_token")
    cloud_id = user_data.get("cloud_id")
    if not access_token or not cloud_id:
        return "Error: User not authenticated with Atlassian.", 403

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Accept": "application/json"
    }

    response = requests.get(f"https://api.atlassian.com/ex/confluence/{cloud_id}/rest/api/content", headers=headers)
    if response.status_code != 200:
        return f"Error fetching Confluence pages: {response.text}", response.status_code

    pages = response.json()
    structured_pages = [
        structure_data("Confluence", "page", {
            "id": page.get("id"),
            "title": page.get("title"),
            "body": page.get("body", {}).get("storage", {}).get("value")
        })
        for page in pages.get("results", [])
    ]

    return jsonify(structured_pages)

@app.route('/fetch_github_issues/<user>', methods=['GET'])
def fetch_github_issues(user):
    access_token = tokens.get(user)
    if not access_token:
        return f"Error: No token available for user {user}.", 404

    headers = {"Authorization": f"Bearer {access_token}"}

    issues_response = requests.get(f"{GITHUB_API_BASE_URL}/issues", headers=headers)
    if issues_response.status_code != 200:
        return f"Error fetching issues: {issues_response.text}", issues_response.status_code

    issues = issues_response.json()
    structured_issues = [
        structure_data("GitHub", "issue", issue)
        for issue in issues
    ]

    return jsonify(structured_issues)

@app.route('/fetch_github_commits/<user>/<repo>', methods=['GET'])
def fetch_github_commits(user, repo):
    access_token = tokens.get(user)
    if not access_token:
        return f"Error: No token available for user {user}.", 404

    headers = {"Authorization": f"Bearer {access_token}"}

    commits_response = requests.get(f"{GITHUB_API_BASE_URL}/repos/{user}/{repo}/commits", headers=headers)
    if commits_response.status_code != 200:
        return f"Error fetching commits: {commits_response.text}", commits_response.status_code

    commits = commits_response.json()
    structured_commits = [
        structure_data("GitHub", "commit", commit)
        for commit in commits
    ]

    return jsonify(structured_commits)

if __name__ == '__main__':
    app.run(debug=True, port=5000, ssl_context=('cert.pem', 'key.pem'))
