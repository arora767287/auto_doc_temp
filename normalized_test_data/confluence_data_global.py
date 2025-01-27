import json
import re
import random

# Input and output file paths
input_file = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/confluence_data.json"  # Replace with your input file path
output_file = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/confluence_data_global.json"  # Replace with your output file path

# Function to generate a sanitized title for ID
def sanitize_title(title):
    sanitized = re.sub(r"[^\w\s-]", "", title)  # Remove special characters
    sanitized = re.sub(r"\s+", "-", sanitized.strip())  # Replace spaces with hyphens
    return sanitized.lower()

# Function to generate a user identifier
def generate_user(authors):
    if authors and isinstance(authors[0], str):  # Check if the first author exists and is a string
        author_parts = authors[0].split("_")
        if len(author_parts) == 2:  # Ensure there are two parts (first and last name)
            first_initial = author_parts[0][0].lower()
            last_name = re.sub(r"[^a-zA-Z]", "", author_parts[1].lower())  # Sanitize last name
            random_number = random.randint(10, 99)  # Generate random number
            return f"{first_initial}{last_name}{random_number}"
    return "unknown"

# Process the Confluence data
def process_confluence_data(data):
    global_counter = 1
    processed_data = []

    for entry in data:
        # Extract and sanitize the title for ID
        title = entry["content"]["title"]
        sanitized_title = sanitize_title(title)

        # Generate new ID
        new_id = f"CONFLUENCE-{global_counter}-{sanitized_title}"

        # Generate user field
        user = generate_user(entry["metadata"].get("authors", []))

        # Update entry with new ID and user
        entry["id"] = new_id
        entry["user"] = user

        # Add updated entry to the list
        processed_data.append(entry)
        global_counter += 1

    return processed_data

# Read input JSON file
with open(input_file, "r") as file:
    confluence_data = json.load(file)

# Process the data
processed_data = process_confluence_data(confluence_data)

# Write the updated data to the output file
with open(output_file, "w") as file:
    json.dump(processed_data, file, indent=4)

print(f"Processed Confluence data saved to {output_file}")
