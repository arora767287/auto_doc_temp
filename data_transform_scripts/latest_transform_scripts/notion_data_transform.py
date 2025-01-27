import os
import markdown
from datetime import datetime
import json

# Directory containing Notion markdown files
notion_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/new_test_data/notion_data"
output_file = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/notion_data.json"

normalized_data = []

# Process each file in the Notion folder
for file_name in os.listdir(notion_folder):
    if file_name.endswith(".md"):
        file_path = os.path.join(notion_folder, file_name)
        with open(file_path, "r") as file:
            lines = file.readlines()
            title = lines[0].replace("#", "").strip()  # Extract title from the first line
            body = "".join(lines[1:]).strip()  # Combine the rest as the body
            
            # Create a normalized data entry
            entry = {
                "id": file_name.split(".")[0],  # Use file name (without extension) as ID
                "source": "notion",
                "type": "document",
                "org": "nvidia",
                "content": {
                    "title": title,
                    "body": body
                },
                "metadata": {
                    "tags": title.split(":")[0].split(),  # Split title for tags (example logic)
                    "authors": ["unknown"]  # Placeholder, no author info available
                },
                "timestamps": {
                    "last_modified": datetime.now().isoformat()  # Use current timestamp
                }
            }
            normalized_data.append(entry)

# Save the normalized data to a JSON file
with open(output_file, "w") as out_file:
    json.dump(normalized_data, out_file, indent=4)

print(f"Normalized data has been saved to {output_file}")
