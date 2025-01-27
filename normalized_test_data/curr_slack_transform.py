import json
import os
import random

# Folder containing the Slack JSON files
input_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/slack_data"  # Replace with your actual folder path
output_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/final_slack_data"  # Replace with your desired output folder path

# Predefined user identifiers
predefined_users = {
    "arjun.mehta": "amehta70",
    "emily.chow": "echow52",
    "maria.garcia": "mgarcia09",
    "samantha.kim": "skim90",
    "michael.chen": "mchen99"
}

# Function to generate a unique user ID if not predefined
def generate_unique_user_id(metadata_user):
    first_initial, last_name = metadata_user.split(".")[0], metadata_user.split(".")[1]
    random_number = random.randint(100, 999)  # Generate a random number
    return f"{first_initial}{last_name}{random_number}"

# Function to process Slack data and update IDs and user fields
def process_slack_data(slack_data, global_counter):
    for event in slack_data:
        channel_name = event["metadata"]["channel"].replace(" ", "-")  # Replace spaces with hyphens
        # Update the ID with the global counter and channel name
        event["id"] = f"SLACK-{global_counter}-{channel_name}"
        global_counter += 1

        # Determine the user field value
        metadata_user = event["metadata"]["user"]
        if metadata_user in predefined_users:
            event["user"] = predefined_users[metadata_user]
        else:
            event["user"] = generate_unique_user_id(metadata_user)

        # Process replies (if any)
        if "replies" in event:
            for reply in event["replies"]:
                channel_name = reply["metadata"]["channel"].replace(" ", "-")
                reply["id"] = f"SLACK-{global_counter}-{channel_name}"
                global_counter += 1

                reply_metadata_user = reply["metadata"]["user"]
                if reply_metadata_user in predefined_users:
                    reply["user"] = predefined_users[reply_metadata_user]
                else:
                    reply["user"] = generate_unique_user_id(reply_metadata_user)
    return slack_data, global_counter

# Process all files in the input folder
global_counter = 1  # Start the global counter
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

for filename in os.listdir(input_folder):
    if filename.endswith(".json"):
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename)

        # Load Slack data
        with open(input_path, "r") as file:
            slack_data = json.load(file)

        # Process the Slack messages
        modified_data, global_counter = process_slack_data(slack_data, global_counter)

        # Save the modified data
        with open(output_path, "w") as file:
            json.dump(modified_data, file, indent=4)

        print(f"Processed {filename} and saved to {output_path}")

print("All Slack JSON files have been processed and saved.")
