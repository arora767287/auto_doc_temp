import os
import json
import hashlib

def normalize_jira_tickets(input_file, output_folder, org_name="nvidia", source="JIRA"):
    os.makedirs(output_folder, exist_ok=True)
    with open(input_file, 'r', encoding='utf-8') as f:
        raw_data = json.load(f)

    normalized_data = []
    for ticket in raw_data.get("jira_tickets", []):
        ticket_id = ticket["ticket_id"]
        jira_id = f"{source}-{org_name}-{ticket_id}"
        
        normalized_entry = {
            "id": jira_id,
            "source": source.lower(),
            "org": org_name,
            "type": "jira_ticket",
            "content": {
                "title": ticket.get("title"),
                "body": ticket.get("description"),
            },
            "metadata": {
                "priority": ticket.get("priority"),
                "assignee": ticket.get("assignee"),
                "status": ticket.get("status"),
            },
            "timestamps": {},
            "url": None
        }
        normalized_data.append(normalized_entry)

        # Save normalized entry to file
        output_file_path = os.path.join(output_folder, f"{ticket_id}.json")
        with open(output_file_path, 'w', encoding='utf-8') as out_file:
            json.dump(normalized_entry, out_file, indent=4)

    return normalized_data

# Example usage
input_file = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/new_test_data/jira_tickets.json"
output_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/normalized_jira_tickets.json"
normalize_jira_tickets(input_file, output_folder)
