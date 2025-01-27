import json
import os

def normalize_slack_file(slack_data, org_name="nvidia", source="SLACK"):
    """
    Normalize a single Slack data file into the unified data format.
    """
    normalized_data = []

    # Iterate through the messages in the Slack file
    for message in slack_data.get("messages", []):
        # Generate a unique ID for the message
        message_id = f"{source}-{org_name}-{slack_data['channel']}-{message['timestamp']}"

        # Normalize the message structure
        normalized_message = {
            "id": message_id,
            "source": source.lower(),
            "org": org_name,
            "type": "slack_message",
            "content": {
                "text": message.get("message", ""),
                "blocks": []  # Placeholder if Slack supports blocks, otherwise empty
            },
            "metadata": {
                "channel": slack_data["channel"],
                "user": message.get("user", "unknown_user")
            },
            "timestamps": {
                "created": message.get("timestamp")
            },
            "replies": []
        }

        # Normalize replies
        for reply in message.get("replies", []):
            reply_id = f"{source}-{org_name}-{slack_data['channel']}-{reply['timestamp']}"
            normalized_reply = {
                "id": reply_id,
                "source": source.lower(),
                "org": org_name,
                "type": "slack_reply",
                "content": {
                    "text": reply.get("message", "")
                },
                "metadata": {
                    "channel": slack_data["channel"],
                    "user": reply.get("user", "unknown_user")
                },
                "timestamps": {
                    "created": reply.get("timestamp")
                }
            }
            normalized_message["replies"].append(normalized_reply)
        
        normalized_data.append(normalized_message)
    
    return normalized_data


def normalize_slack_folder(input_folder, output_folder, org_name="nvidia", source="SLACK"):
    """
    Process all Slack files in a folder and normalize them into the unified data format.
    """
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for file_name in os.listdir(input_folder):
        if file_name.endswith(".json"):
            input_file = os.path.join(input_folder, file_name)
            output_file = os.path.join(output_folder, file_name)

            # Load the Slack data
            with open(input_file, "r") as infile:
                slack_data = json.load(infile)
            
            # Normalize the data
            normalized_data = normalize_slack_file(slack_data, org_name, source)

            # Save the normalized data
            with open(output_file, "w") as outfile:
                json.dump(normalized_data, outfile, indent=2)
            
            print(f"Processed and saved normalized data for {file_name}")


# Example usage
input_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/new_test_data/slack_data"  # Folder containing the raw Slack JSON files
output_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/slack_data"  # Folder to save the normalized files
normalize_slack_folder(input_folder, output_folder)
