import os
import json

def normalize_github_data(input_folder, output_folder, org_name="nvidia", source="GITHUB"):
    os.makedirs(output_folder, exist_ok=True)
    normalized_data = []

    for file_name in os.listdir(input_folder):
        if file_name.endswith(".json"):
            file_path = os.path.join(input_folder, file_name)
            with open(file_path, 'r', encoding='utf-8') as f:
                raw_data = json.load(f)

            # Iterate through repositories in the GitHub data
            for repo_data in raw_data.get("github_data", []):
                repository = repo_data.get("repository", "unknown_repo")

                # Normalize issues
                for issue in repo_data.get("issues", []):
                    issue_id = f"{source}-{org_name}-{repository}-issue-{issue['issue_id']}"
                    normalized_entry = {
                        "id": issue_id,
                        "source": source.lower(),
                        "org": org_name,
                        "type": "github_issue",
                        "content": {
                            "title": issue.get("title"),
                            "body": issue.get("description")
                        },
                        "metadata": {
                            "repository": repository,
                            "status": issue.get("status"),
                            "linked_jira_ticket": issue.get("linked_jira_ticket")
                        },
                        "timestamps": {
                            "created_at": issue.get("timestamp"),
                        },
                        "url": None  # Add if URL exists in the input data
                    }
                    normalized_data.append(normalized_entry)
                    output_file_path = os.path.join(output_folder, f"{issue_id}.json")
                    with open(output_file_path, 'w', encoding='utf-8') as out_file:
                        json.dump(normalized_entry, out_file, indent=4)

                # Normalize commits
                for commit in repo_data.get("commits", []):
                    commit_id = f"{source}-{org_name}-{repository}-commit-{commit['commit_id']}"
                    normalized_entry = {
                        "id": commit_id,
                        "source": source.lower(),
                        "org": org_name,
                        "type": "github_commit",
                        "content": {
                            "title": commit.get("message").split("\n")[0],  # Use the first line of the message as the title
                            "body": commit.get("message")
                        },
                        "metadata": {
                            "repository": repository,
                            "linked_jira_ticket": commit.get("linked_jira_ticket")
                        },
                        "timestamps": {
                            "created_at": commit.get("timestamp"),
                        },
                        "url": None  # Add if URL exists in the input data
                    }
                    normalized_data.append(normalized_entry)
                    output_file_path = os.path.join(output_folder, f"{commit_id}.json")
                    with open(output_file_path, 'w', encoding='utf-8') as out_file:
                        json.dump(normalized_entry, out_file, indent=4)

    return normalized_data

# Example Usage
input_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/new_test_data/github_data"
output_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/github_data"
normalize_github_data(input_folder, output_folder)
