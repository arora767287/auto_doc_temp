import json
from datetime import datetime

# Input and output file paths
input_file = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/new_test_data/confluence_data/confluence_data.json"
output_file = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/confluence_data.json"

# Load the Confluence data
with open(input_file, "r") as file:
    confluence_data = json.load(file)

# Initialize a list to store normalized data
normalized_data = []

# Iterate through each Confluence page
for page in confluence_data:
    normalized_entry = {
        "id": page["id"],
        "source": "confluence",
        "type": "document",
        "org": "nvidia",
        "content": {
            "title": page["title"],
            "body": page["body"]
        },
        "metadata": {
            "tags": page["tags"],
            "authors": page["authors"],
            "related_topics": page["related_topics"]
        },
        "timestamps": {
            "last_modified": page["last_modified"]
        }
    }
    normalized_data.append(normalized_entry)

# Save the normalized data to a new JSON file
with open(output_file, "w") as file:
    json.dump(normalized_data, file, indent=4)

print(f"Normalized data has been saved to {output_file}")
