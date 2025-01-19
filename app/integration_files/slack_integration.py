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

tokens = {}  # Temporary storage for tokens. Replace with a database in production.
workspaces = {}  # Store workspace-specific data like tokens, team_id, etc.

@app.route('/')
def home():
    return '<a href="/auth">Sign in with Slack</a>'

@app.route('/auth')
def auth():
    query_params = {
        "client_id": SLACK_CLIENT_ID,
        "scope": "channels:history,im:history,mpim:history,groups:history,users:read,team:read,channels:read,groups:read,mpim:read,im:read,channels:manage,channels:join",
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
    print(channels_response.json())
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
            print(channel_id)
            join_response = requests.post(f"{BASE_URL}/conversations.join", headers=headers, json={"channel": channel_id})
            join_data = join_response.json()
            print("Join Response:", join_response.status_code, join_data)
            if not join_data.get("ok"):
                print(f"Failed to join channel {channel_id}: {join_data.get('error')}")
                continue

        # Fetch message history
        history_response = requests.get(f"{BASE_URL}/conversations.history", params={"channel": channel_id}, headers=headers)
        if history_response.status_code != 200:
            continue

        history_data = history_response.json()

        if not history_data.get("ok"):
            continue

        for message in history_data.get("messages", []):
            messages.append({
                "channel": channel_id,
                "user": message.get("user"),
                "text": message.get("text"),
                "timestamp": message.get("ts")
            })

    return jsonify(messages)


if __name__ == '__main__':
    app.run(debug=True, port=5000, ssl_context=('cert.pem', 'key.pem'))

