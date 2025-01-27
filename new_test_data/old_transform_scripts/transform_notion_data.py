import os
import hashlib
from datetime import datetime
import json

def parse_markdown(file_path):
    """Parse a Markdown file into title and body."""
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Extract the title (assumed to be the first Markdown header)
    title = None
    body = []
    for line in lines:
        if line.startswith("# "):  # Top-level header as title
            title = line.strip("# ").strip()
        else:
            body.append(line.strip())

    return title, "\n".join(body)

def normalize_notion_data(folder_path, output_folder, org_name="nvidia", source="NOTION"):
    os.makedirs(output_folder, exist_ok=True)
    normalized_data = []
    for file_name in os.listdir(folder_path):
        if file_name.endswith(".md"):
            file_path = os.path.join(folder_path, file_name)
            title, body = parse_markdown(file_path)

            # Generate a unique ID using the file hash
            file_hash = hashlib.md5(file_name.encode('utf-8')).hexdigest()
            notion_id = f"{source}-{org_name}-{file_hash}"

            # Get last modified timestamp
            last_modified = datetime.utcfromtimestamp(os.path.getmtime(file_path)).isoformat()

            # Create normalized entry
            normalized_entry = {
                "id": notion_id,
                "source": source.lower(),
                "org": org_name,
                "type": "notion_page",
                "content": {
                    "title": title,
                    "body": body,
                },
                "metadata": {
                    "tags": [],  # Add logic to extract tags if available
                    "authors": []  # If authors are part of metadata, extract them
                },
                "timestamps": {
                    "last_modified": last_modified
                },
                "url": None  # Add Notion URL if available
            }

            normalized_data.append(normalized_entry)

            # Save each normalized entry as a JSON file
            output_file_path = os.path.join(output_folder, f"{file_hash}.json")
            with open(output_file_path, 'w', encoding='utf-8') as out_file:
                json.dump(normalized_entry, out_file, indent=4)

    return normalized_data

# Example Usage
input_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/new_test_data/notion_data"
output_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/notion_data"
normalize_notion_data(input_folder, output_folder)
