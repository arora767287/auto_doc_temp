import os
import json
import hashlib

def normalize_slack_data(input_folder, output_folder, org_name="nvidia", source="SLACK"):
    os.makedirs(output_folder, exist_ok=True)
    normalized_data = []
    for file_name in os.listdir(input_folder):
        if file_name.endswith(".json"):
            file_path = os.path.join(input_folder, file_name)
            with open(file_path, 'r', encoding='utf-8') as f:
                raw_data = json.load(f)

            for channel_id, messages in raw_data.get("channel", {}).get("messages", {}).items():
                for message in messages:
                    msg_id = hashlib.md5(f"{channel_id}-{message.get('ts')}".encode()).hexdigest()
                    slack_id = f"{source}-{org_name}-{msg_id}"
                    
                    normalized_entry = {
                        "id": slack_id,
                        "source": source.lower(),
                        "org": org_name,
                        "type": "slack_message",
                        "content": {
                            "title": None,  # Slack messages don't have a title
                            "body": message.get("text", ""),
                        },
                        "metadata": {
                            "user": message.get("user"),
                            "channel_id": channel_id,
                            "blocks": message.get("blocks", []),
                        },
                        "timestamps": {
                            "sent_at": message.get("ts"),
                        },
                        "url": None
                    }
                    normalized_data.append(normalized_entry)

                    # Save normalized entry to file
                    output_file_path = os.path.join(output_folder, f"{msg_id}.json")
                    with open(output_file_path, 'w', encoding='utf-8') as out_file:
                        json.dump(normalized_entry, out_file, indent=4)
    return normalized_data

# Example usage
input_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/new_test_data/slack_data"
output_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/normalized_slack_data"
normalize_slack_data(input_folder, output_folder)
