import requests

NOTION_API_URL = "https://api.notion.com/v1/pages"
NOTION_API_KEY = "your-notion-api-key"

def update_knowledge_base(user_id: str, data: list):
    """Updates the knowledge base with aggregated data."""
    headers = {
        "Authorization": f"Bearer {NOTION_API_KEY}",
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
    }
    for entry in data:
        body = {
            "parent": {"database_id": "your-database-id"},
            "properties": {
                "User": {"title": [{"text": {"content": user_id}}]},
                "Summary": {"rich_text": [{"text": {"content": entry["summary"]}}]},
            },
        }
        requests.post(NOTION_API_URL, json=body, headers=headers)
