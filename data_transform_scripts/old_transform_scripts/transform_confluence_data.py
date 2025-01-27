import os
import json
import hashlib

def normalize_confluence_data(input_file, output_folder, org_name="nvidia", source="CONFLUENCE"):
    os.makedirs(output_folder, exist_ok=True)
    with open(input_file, 'r', encoding='utf-8') as f:
        raw_data = json.load(f)

    normalized_data = []
    for page in raw_data:
        confluence_id = f"{source}-{org_name}-{page['id']}"
        
        normalized_entry = {
            "id": confluence_id,
            "source": source.lower(),
            "org": org_name,
            "type": "confluence_page",
            "content": {
                "title": page.get("title"),
                "body": page.get("body"),
            },
            "metadata": {
                "tags": page.get("tags", []),
                "authors": page.get("authors", []),
            },
            "timestamps": {
                "last_modified": page.get("last_modified"),
            },
            "url": None
        }
        normalized_data.append(normalized_entry)

        # Save normalized entry to file
        output_file_path = os.path.join(output_folder, f"{page['id']}.json")
        with open(output_file_path, 'w', encoding='utf-8') as out_file:
            json.dump(normalized_entry, out_file, indent=4)

    return normalized_data

# Example usage
input_file = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/new_test_data/confluence_data.json"
output_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/normalized_confluence_data.json"
normalize_confluence_data(input_file, output_folder)
