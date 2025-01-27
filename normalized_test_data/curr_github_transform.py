import json
import os
import random

# Input and output folder paths
input_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/github_data"  # Replace with the path to your folder containing GitHub JSON files
output_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/modified_github_data"  # Replace with your desired output folder path

# Ensure the output folder exists
os.makedirs(output_folder, exist_ok=True)

# List of user identifiers to assign
user_identifiers = ["amehta70", "echow52", "mgarcia09", "skim90", "mchen99"]

# Function to modify the ID and assign user identifiers
def modify_github_event(event, global_counter, user_identifiers):
    # Extract the existing ID parts
    id_parts = event["id"].split("-")
    repository_id = "-".join(id_parts[2:])  # Remove "GITHUB" and "nvidia" parts
    
    # Create the new ID with the global counter
    new_id = f"GITHUB-{global_counter}-{repository_id}"
    
    # Assign user identifier with a bias towards "amehta70"
    user_field = random.choices(
        user_identifiers,
        weights=[70, 10, 10, 5, 5],  # Bias towards "amehta70"
        k=1
    )[0]
    
    # Update the event
    event["id"] = new_id
    event["user"] = user_field
    return event

# Global counter for all files
global_counter = 1

# Loop through all files in the input folder
for filename in os.listdir(input_folder):
    if filename.endswith(".json"):  # Process only JSON files
        input_file_path = os.path.join(input_folder, filename)
        output_file_path = os.path.join(output_folder, filename)
        
        # Load the GitHub data from the file
        with open(input_file_path, "r") as file:
            github_data = json.load(file)
        
        # Modify each event in the file
        modified_data = []
        for event in github_data:
            modified_event = modify_github_event(event, global_counter, user_identifiers)
            modified_data.append(modified_event)
            global_counter += 1  # Increment the global counter
        
        # Save the modified data to the output folder
        with open(output_file_path, "w") as file:
            json.dump(modified_data, file, indent=4)

print(f"All GitHub JSON files processed and saved to {output_folder}")
