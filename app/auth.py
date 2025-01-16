import requests
from app.utils import store_token

PLATFORM_DETAILS = {
    "slack": {
        "token_url": "https://slack.com/api/oauth.v2.access",
        "client_id": "your-slack-client-id",
        "client_secret": "your-slack-client-secret",
        "redirect_uri": "your-slack-redirect-uri",
    },
    "jira": {
        "token_url": "https://auth.atlassian.com/oauth/token",
        "client_id": "your-jira-client-id",
        "client_secret": "your-jira-client-secret",
        "redirect_uri": "your-jira-redirect-uri",
    },
    "notion": {
        "token_url": "https://api.notion.com/v1/oauth/token",
        "client_id": "your-notion-client-id",
        "client_secret": "your-notion-client-secret",
        "redirect_uri": "your-notion-redirect-uri",
    },
    "teams": {
        "token_url": "https://login.microsoftonline.com/common/oauth2/v2.0/token",
        "client_id": "your-teams-client-id",
        "client_secret": "your-teams-client-secret",
        "redirect_uri": "your-teams-redirect-uri",
    },
    "confluence": {
        "token_url": "https://auth.atlassian.com/oauth/token",
        "client_id": "your-confluence-client-id",
        "client_secret": "your-confluence-client-secret",
        "redirect_uri": "your-confluence-redirect-uri",
    },
}

def authenticate_user(platform: str, auth_code: str) -> dict:
    """Handles OAuth2 authentication for all supported platforms."""
    if platform not in PLATFORM_DETAILS:
        raise ValueError(f"Unsupported platform: {platform}")

    details = PLATFORM_DETAILS[platform]
    data = {
        "client_id": details["client_id"],
        "client_secret": details["client_secret"],
        "code": auth_code,
        "redirect_uri": details["redirect_uri"],
        "grant_type": "authorization_code",
    }

    response = requests.post(details["token_url"], data=data)
    if response.status_code == 200:
        token_data = response.json()
        store_token(platform, token_data)
        return token_data
    return None
