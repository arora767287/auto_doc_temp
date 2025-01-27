import json
from datetime import datetime

# Input and output file paths
input_file = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/sorted_all_tickets.json"  # Replace with your input file path
output_file = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/sorted_global_all_tickets.json"  # Replace with your desired output file path

# Load JSON data
with open(input_file, "r") as file:
    data = json.load(file)

# Sort the data by timestamps.created
sorted_data = sorted(data, key=lambda x: datetime.fromisoformat(x["timestamps"]["created"].replace("Z", "+00:00")))

# Renumber the IDs
for index, item in enumerate(sorted_data, start=1):
    # Extract the original ID parts
    original_id_parts = item["id"].split("-")
    
    # Identify the type of the source
    source_type = original_id_parts[0]  # E.g., "SLACK", "GITHUB", "JIRA"
    
    # Rebuild the new ID with the global counter
    channel_or_repo_name = "-".join(original_id_parts[2:])  # Everything after the first two parts
    new_id = f"{source_type}-{index}-{channel_or_repo_name}"
    
    # Update the ID in the item
    item["id"] = new_id

# Save the sorted and renumbered data to a new JSON file
with open(output_file, "w") as file:
    json.dump(sorted_data, file, indent=4)

print(f"Data sorted, IDs renumbered, and saved to {output_file}")
