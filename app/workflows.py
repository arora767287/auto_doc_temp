import requests
from app.utils import get_user_tokens

N8N_BASE_URL = "your-n8n-webhook-url"

def trigger_workflow(platform: str, user_id: str):
    """Triggers an n8n workflow for a specific platform."""
    tokens = get_user_tokens(user_id, platform)
    response = requests.post(f"{N8N_BASE_URL}/{platform}", json=tokens)
    return response.json()

def trigger_batch_workflow(user_id: str):
    """Triggers batch workflows for all platforms."""
    platforms = ["slack", "jira", "notion", "teams", "confluence"]
    aggregated_data = []
    for platform in platforms:
        result = trigger_workflow(platform, user_id)
        aggregated_data.append(result)
    return aggregated_data
