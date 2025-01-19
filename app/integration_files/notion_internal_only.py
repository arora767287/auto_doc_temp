from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

# Replace with your integration token
NOTION_INTEGRATION_TOKEN = "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"
NOTION_BASE_URL = "https://api.notion.com/v1"
NOTION_VERSION = "2022-06-28"

# Headers for authentication
HEADERS = {
    "Authorization": f"Bearer {NOTION_INTEGRATION_TOKEN}",
    "Notion-Version": NOTION_VERSION
}

@app.route("/")
def home():
    return """
        <h1>Notion Integration</h1>
        <a href="/fetch_pages">Fetch Pages</a>
    """

@app.route("/fetch_pages", methods=["GET"])
def fetch_pages():
    # Fetch all pages the integration has access to
    url = f"{NOTION_BASE_URL}/search"
    response = requests.post(url, headers=HEADERS, json={"query": ""})  # Empty query to get all results
    if response.status_code != 200:
        return f"Error fetching pages: {response.text}", response.status_code

    data = response.json()
    pages = data.get("results", [])
    
    # Extract key information about each page
    structured_pages = [
        {
            "id": page.get("id"),
            "title": page.get("properties", {}).get("title", {}).get("title", [{}])[0].get("text", {}).get("content", "Untitled"),
            "url": page.get("url")
        }
        for page in pages
        if page["object"] == "page"
    ]
    return jsonify(structured_pages)

@app.route("/fetch_page_content/<page_id>", methods=["GET"])
def fetch_page_content(page_id):
    # Fetch content (blocks) for a specific page
    url = f"{NOTION_BASE_URL}/blocks/{page_id}/children"
    response = requests.get(url, headers=HEADERS)
    if response.status_code != 200:
        return f"Error fetching page content: {response.text}", response.status_code

    data = response.json()
    blocks = data.get("results", [])

    # Structure block content
    structured_blocks = [
        {
            "id": block.get("id"),
            "type": block.get("type"),
            "text": block.get(block.get("type"), {}).get("text", [{}])[0].get("plain_text", "")
        }
        for block in blocks
    ]
    return jsonify(structured_blocks)

if __name__ == "__main__":
    app.run(debug=True, port=5000, ssl_context=('cert.pem', 'key.pem'))
