import json
import re
import random

# Input and output file paths
input_file = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/notion_data.json"  # Replace with your input file path
output_file = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/notion_data_global.json"  # Replace with your desired output file path

# User identifiers and their probabilities
user_identifiers = ["amehta70", "echow52", "mgarcia09", "skim90", "mchen99"]
user_weights = [70, 10, 10, 5, 5]  # Bias towards "amehta70"

# Load the Notion data
with open(input_file, "r") as file:
    data = json.load(file)

# Function to sanitize titles for IDs
def sanitize_title(title):
    sanitized = re.sub(r"[^\w\s-]", "", title)  # Remove non-alphanumeric characters
    sanitized = re.sub(r"\s+", "-", sanitized.strip())  # Replace spaces with hyphens
    return sanitized.lower()

# Add "user" field and update "id"
for global_counter, entry in enumerate(data, start=1):
    # Generate a new ID
    title = entry["content"]["title"]
    sanitized_title = sanitize_title(title)
    new_id = f"NOTION-{global_counter}-{sanitized_title}"
    entry["id"] = new_id
    
    # Assign a user
    entry["user"] = random.choices(user_identifiers, weights=user_weights, k=1)[0]

# Save the updated data
with open(output_file, "w") as file:
    json.dump(data, file, indent=4)

print(f"Updated data saved to {output_file}")
