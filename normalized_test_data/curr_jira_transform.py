import json
import os

# Input and output folder paths
input_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/normalized_jira_data"  # Replace with your actual input folder path
output_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/modified_jira_data"  # Replace with your desired output folder path

# Ensure the output folder exists
os.makedirs(output_folder, exist_ok=True)

# Function to modify Jira ticket data
def modify_jira_ticket(event, global_counter):
    # Extract the category (e.g., SAFETY) and original ID (e.g., 595) from the existing ID
    id_parts = event["id"].split("-")
    category = id_parts[2]  # SAFETY, DEEPFAKE, etc.
    original_id = id_parts[3]  # 595, 204, etc.

    # Create a new ID using the global counter, category, and original ID
    new_id = f"JIRA-{global_counter}-{category}-{original_id}"

    # Add the user field
    event["id"] = new_id
    event["user"] = "amehta70"
    return event

# Initialize a global counter
global_counter = 1

# Iterate through all JSON files in the input folder
for filename in os.listdir(input_folder):
    if filename.endswith(".json"):
        input_file_path = os.path.join(input_folder, filename)
        output_file_path = os.path.join(output_folder, filename)

        # Load Jira ticket data from the file
        with open(input_file_path, "r") as file:
            jira_data = json.load(file)

        # Modify each Jira ticket with a global counter
        modified_data = []
        for event in jira_data:
            modified_event = modify_jira_ticket(event, global_counter)
            modified_data.append(modified_event)
            global_counter += 1

        # Save the modified data to the output folder
        with open(output_file_path, "w") as file:
            json.dump(modified_data, file, indent=4)

        print(f"Processed file: {filename} -> {output_file_path}")

print(f"All Jira JSON files processed and saved to {output_folder}.")
