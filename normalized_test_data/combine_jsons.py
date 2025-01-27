import os
import json

# List of folders containing the JSON files
folders = [
    "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/final_github_data",
    "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/final_jira_data",
    "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/final_slack_data"
]  # Add paths to more folders as needed

# Output file path
output_file = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/ombined_all_tickets.json"

# Function to get all JSON files from the list of folders
def get_all_json_files(folders):
    
    json_files = []
    for folder in folders:
        for root, _, files in os.walk(folder):
            for file in files:
                if file.endswith(".json"):
                    json_files.append(os.path.join(root, file))
    return json_files

# Function to combine JSON files into a single list
def combine_json_files(json_files):
    combined_data = []
    for file in json_files:
        with open(file, "r") as f:
            try:
                data = json.load(f)
                if isinstance(data, list):  # Ensure the JSON is a list
                    combined_data.extend(data)
                else:
                    print(f"Warning: {file} does not contain a list, skipping...")
            except json.JSONDecodeError:
                print(f"Error: {file} is not a valid JSON file, skipping...")
    return combined_data

# Get all JSON files from the folders
json_files = get_all_json_files(folders)

# Combine the JSON files into one list
combined_data = combine_json_files(json_files)

# Save the combined data into a single JSON file
with open(output_file, "w") as output:
    json.dump(combined_data, output, indent=4)

print(f"Combined {len(json_files)} JSON files into {output_file}")
