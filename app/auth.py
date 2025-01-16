import requests
from cryptography.fernet import Fernet
import os

# Encryption setup
SECRET_KEY = os.environ["SECRET_KEY"]
cipher = Fernet(SECRET_KEY)

def authenticate_user(platform: str, auth_code: str) -> dict:
    """Handles OAuth2 authentication and stores tokens."""
    if platform == "slack":
        url = "https://slack.com/api/oauth.v2.access"
        data = {
            "client_id": os.environ["SLACK_CLIENT_ID"],
            "client_secret": os.environ["SLACK_CLIENT_SECRET"],
            "code": auth_code,
            "redirect_uri": os.environ["SLACK_REDIRECT_URI"],
        }
    elif platform == "jira":
        url = "https://auth.atlassian.com/oauth/token"
        data = {
            "grant_type": "authorization_code",
            "client_id": os.environ["JIRA_CLIENT_ID"],
            "client_secret": os.environ["JIRA_CLIENT_SECRET"],
            "code": auth_code,
            "redirect_uri": os.environ["JIRA_REDIRECT_URI"],
        }
    else:
        raise ValueError("Unsupported platform")

    response = requests.post(url, data=data)
    if response.status_code == 200:
        token_data = response.json()
        token_data["access_token"] = cipher.encrypt(token_data["access_token"].encode()).decode()
        return token_data
    return None
