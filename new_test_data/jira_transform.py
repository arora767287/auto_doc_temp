import json
import os
from datetime import datetime, timedelta


def normalize_jira_ticket(ticket, org_name="nvidia", source="jira"):
    """
    Normalizes a single Jira ticket into the unified format.
    """
    ticket_id = f"{source.upper()}-{org_name}-{ticket['ticket_id']}"
    normalized_ticket = {
        "id": ticket_id,
        "source": source.lower(),
        "org": org_name,
        "type": "jira_ticket",
        "content": {
            "title": ticket["title"],
            "description": ticket["description"]
        },
        "metadata": {
            "priority": ticket["priority"],
            "assignee": ticket["assignee"],
            "status": ticket["status"]
        },
        "timestamps": {
            "created": ticket["timestamp"]
        }
    }
    return normalized_ticket


def add_timestamps_normalize_and_split(input_file, output_folder, num_splits=5):
    """
    Adds timestamps, normalizes Jira tickets, and splits the data into separate files.
    """
    # Load the input file
    with open(input_file, "r") as infile:
        data = json.load(infile)

    messages = data.get("jira_tickets", [])

    # Start timestamp: Aligned with existing Slack data
    start_time = datetime(2025, 1, 20, 9, 0, 0)  # Jan 20, 2025, 9:00 AM
    time_increment = timedelta(minutes=10)  # Increment timestamps by 10 minutes

    normalized_messages = []
    for ticket in messages:
        ticket["timestamp"] = start_time.isoformat() + "Z"
        start_time += time_increment

        # Normalize the ticket
        normalized_ticket = normalize_jira_ticket(ticket)
        normalized_messages.append(normalized_ticket)

    # Split normalized messages into `num_splits` files
    split_size = len(normalized_messages) // num_splits
    if len(normalized_messages) % num_splits != 0:
        split_size += 1

    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for i in range(num_splits):
        start_idx = i * split_size
        end_idx = start_idx + split_size
        split_messages = normalized_messages[start_idx:end_idx]

        # Save the split file
        output_file = os.path.join(output_folder, f"jira_split_{i + 1}.json")
        with open(output_file, "w") as outfile:
            json.dump(split_messages, outfile, indent=2)
        print(f"Saved {len(split_messages)} tickets to {output_file}")


# Example usage
input_file = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/new_test_data/jira_tickets.json"  # Replace with your input file path
output_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/normalized_jira_data"  # Replace with your desired output folder

add_timestamps_normalize_and_split(input_file, output_folder, num_splits=5)
