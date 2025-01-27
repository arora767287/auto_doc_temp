import os
import json
from datetime import datetime
from dateutil.parser import isoparse

# Helper function to create directory if it doesn't exist
def create_directory(path):
    if not os.path.exists(path):
        os.makedirs(path)

# Function to normalize and organize GitHub data
def process_github_data(input_folder, output_folder):
    for file_name in os.listdir(input_folder):
        if file_name.endswith(".json"):
            with open(os.path.join(input_folder, file_name), "r") as f:
                data = json.load(f)

            for repo in data["github_data"]:
                repo_name = repo["repository"]
                # Sort issues and commits by timestamp
                repo["issues"] = sorted(repo["issues"], key=lambda x: isoparse(x["timestamp"]))
                repo["commits"] = sorted(repo["commits"], key=lambda x: isoparse(x["timestamp"]))

                # Determine the output folder based on the first issue's or commit's timestamp
                timestamps = [
                    isoparse(issue["timestamp"]) for issue in repo["issues"]
                ] + [
                    isoparse(commit["timestamp"]) for commit in repo["commits"]
                ]
                if timestamps:
                    earliest_timestamp = min(timestamps)
                    year_month = earliest_timestamp.strftime("%Y-%m")
                    repo_output_folder = os.path.join(output_folder, year_month)
                    create_directory(repo_output_folder)

                    # Save the normalized repository data
                    output_file = os.path.join(repo_output_folder, f"{repo_name}.json")
                    with open(output_file, "w") as out_f:
                        json.dump(repo, out_f, indent=4)


# Function to normalize and organize Confluence data
def process_confluence_data(input_folder, output_folder):
    for file_name in os.listdir(input_folder):
        if file_name.endswith(".json"):
            with open(os.path.join(input_folder, file_name), "r") as f:
                data = json.load(f)

            for page in data:
                # Determine the output folder based on the last_modified date
                last_modified = datetime.fromisoformat(page["last_modified"])
                year_month = last_modified.strftime("%Y-%m")
                page_output_folder = os.path.join(output_folder, year_month)
                create_directory(page_output_folder)

                # Save the normalized page data
                output_file = os.path.join(page_output_folder, f"{page['id']}.json")
                with open(output_file, "w") as out_f:
                    json.dump(page, out_f, indent=4)

# Function to normalize and organize Slack data
def process_slack_data(input_folder, output_folder):
    print("Running")
    for file_name in os.listdir(input_folder):
        if file_name.endswith(".json"):
            with open(os.path.join(input_folder, file_name), "r") as f:
                data = json.load(f)
                # print(data)

            # Sort messages by timestamp within each channel
            for channel in data.get("channels", []):
                channel["messages"] = sorted(channel.get("messages", []), key=lambda x: x["ts"])
            print(data)
            # Determine the output folder based on the earliest message's timestamp
            all_timestamps = [
                datetime.fromisoformat(msg["ts"]) for channel in data.get("channels", []) for msg in channel.get("messages", [])
            ]
            print(all_timestamps)
            if all_timestamps:
                earliest_timestamp = min(all_timestamps)
                year_month = earliest_timestamp.strftime("%Y-%m")
                slack_output_folder = os.path.join(output_folder, year_month)
                create_directory(slack_output_folder)

                # Save the normalized Slack data
                output_file = os.path.join(slack_output_folder, file_name)
                with open(output_file, "w") as out_f:
                    print(output_file)
                    json.dump(data, out_f, indent=4)

# Input and output folders
input_github_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/new_test_data/github_data"
output_github_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/github_data"

input_confluence_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/new_test_data/confluence_data"
output_confluence_folder = "normalized/confluence"

input_slack_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/new_test_data/slack_data"
output_slack_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/slack_data"

# Process each data source
# process_github_data(input_github_folder, output_github_folder)
# process_confluence_data(input_confluence_folder, output_confluence_folder)
process_slack_data(input_slack_folder, output_slack_folder)
