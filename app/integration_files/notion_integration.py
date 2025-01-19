from flask import Flask, request, jsonify, redirect, session
import requests
import os
from urllib.parse import urlencode

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "supersecretkey")  # Replace with a secure key in production

NOTION_CLIENT_ID = "180d872b-594c-80c7-80f6-00373d82409d"  # Replace with your actual Client ID
NOTION_CLIENT_SECRET = "secret_vVgLWvqrdWvpO6xBp7YWHxy31ebVq2fI74EegWXltoQ"  # Replace with your actual Client Secret
NOTION_REDIRECT_URI = "https://127.0.0.1:5000/notion_callback"
NOTION_BASE_URL = "https://api.notion.com/v1"
NOTION_TOKEN_URL = "https://api.notion.com/v1/oauth/token"
NOTION_AUTH_URL = "https://api.notion.com/v1/oauth/authorize"

# Store tokens in memory (replace with a database in production)
tokens = {}

@app.route("/")
def home():
    return '''
        <h1>Welcome to Notion Integration</h1>
        <a href="/notion_auth">Sign in with Notion</a>
    '''

@app.route("/notion_auth")
def notion_auth():
    query_params = {
        "client_id": NOTION_CLIENT_ID,
        "redirect_uri": NOTION_REDIRECT_URI,
        "response_type": "code",
        "owner": "user",  # Specifies that you're authenticating a user, not a workspace
    }
    auth_url = f"{NOTION_AUTH_URL}?{urlencode(query_params)}"
    return redirect(auth_url)

@app.route("/notion_callback")
def notion_callback():
    code = request.args.get("code")
    if not code:
        return "Error: Missing authorization code", 400
    print(code)

    # Exchange the authorization code for an access token
    response = requests.post(
        NOTION_TOKEN_URL,
        headers={"Content-Type": "application/json"},
        json={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": NOTION_REDIRECT_URI,
            "client_id": NOTION_CLIENT_ID,
            "client_secret": NOTION_CLIENT_SECRET,
        },
    )

    if response.status_code != 200:
        return f"Error fetching Notion access token: {response.text}", 500

    data = response.json()
    access_token = data.get("access_token")
    bot_id = data.get("bot_id")
    workspace_name = data.get("workspace_name")

    # Store the token securely (in memory for demo purposes)
    tokens[bot_id] = {
        "access_token": access_token,
        "workspace_name": workspace_name,
    }

    return f"Authentication successful for workspace: {workspace_name}. Access token stored."

@app.route("/notion/databases/<bot_id>")
def fetch_databases(bot_id):
    token_data = tokens.get(bot_id)
    if not token_data:
        return "Error: Bot ID not authenticated", 403

    access_token = token_data["access_token"]
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Notion-Version": "2022-06-28",  # Use the latest Notion API version
    }

    response = requests.get(f"{NOTION_BASE_URL}/databases", headers=headers)
    if response.status_code != 200:
        return f"Error fetching databases: {response.text}", response.status_code

    return jsonify(response.json())

@app.route("/notion/pages/<bot_id>/<page_id>")
def fetch_page(bot_id, page_id):
    token_data = tokens.get(bot_id)
    if not token_data:
        return "Error: Bot ID not authenticated", 403

    access_token = token_data["access_token"]
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Notion-Version": "2022-06-28",
    }

    response = requests.get(f"{NOTION_BASE_URL}/pages/{page_id}", headers=headers)
    if response.status_code != 200:
        return f"Error fetching page: {response.text}", response.status_code

    return jsonify(response.json())

@app.route("/notion/blocks/<bot_id>/<block_id>")
def fetch_block(bot_id, block_id):
    token_data = tokens.get(bot_id)
    if not token_data:
        return "Error: Bot ID not authenticated", 403

    access_token = token_data["access_token"]
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Notion-Version": "2022-06-28",
    }

    response = requests.get(f"{NOTION_BASE_URL}/blocks/{block_id}/children", headers=headers)
    if response.status_code != 200:
        return f"Error fetching block children: {response.text}", response.status_code

    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True, port=5000, ssl_context=('cert.pem', 'key.pem'))
