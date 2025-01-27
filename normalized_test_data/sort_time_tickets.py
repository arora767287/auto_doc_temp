import json
from datetime import datetime

# Input and output file paths
input_file = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/combined_all_tickets.json"  # Replace with your input file path
output_file = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/sorted_all_tickets.json"  # Replace with your desired output file path

# Load JSON data
with open(input_file, "r") as file:
    data = json.load(file)

# Sort the data by timestamps.created
sorted_data = sorted(data, key=lambda x: datetime.fromisoformat(x["timestamps"]["created"].replace("Z", "+00:00")))

# Save the sorted data to a new JSON file
with open(output_file, "w") as file:
    json.dump(sorted_data, file, indent=4)

print(f"Data sorted by timestamps.created and saved to {output_file}")
