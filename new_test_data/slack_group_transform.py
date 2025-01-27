import os
import json
from collections import defaultdict

def extract_group_tag(file_name):
    """
    Extracts the group tag (e.g., '_first', '_second') from a file name.
    """
    for tag in ["_first", "_second", "_third", "_fourth", "_fifth"]:
        if tag in file_name:
            return tag
    return None

def concatenate_files_by_group(input_folder, output_folder):
    """
    Combines JSON files with the same group tag (e.g., '_first') into a single JSON file.
    """
    grouped_data = defaultdict(list)

    # Iterate through files in the input folder
    for file_name in os.listdir(input_folder):
        if file_name.endswith(".json"):
            group_tag = extract_group_tag(file_name)
            if group_tag:
                input_file_path = os.path.join(input_folder, file_name)

                # Load the file's data
                with open(input_file_path, "r") as infile:
                    file_data = json.load(infile)

                # Append the file's data to the appropriate group
                grouped_data[group_tag].extend(file_data)

    # Save concatenated files for each group
    for group_tag, combined_data in grouped_data.items():
        output_file_path = os.path.join(output_folder, f"slack{group_tag}.json")
        with open(output_file_path, "w") as outfile:
            json.dump(combined_data, outfile, indent=2)
        print(f"Concatenated data for group {group_tag} saved to {output_file_path}")

# Example usage
input_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/slack_data"  # Folder containing the normalized Slack JSON files
output_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/combined_slack_data"  # Folder to save the concatenated files

# Create output folder if it doesn't exist
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

concatenate_files_by_group(input_folder, output_folder)
