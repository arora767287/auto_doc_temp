import os
import json


def normalize_github_issue(issue, repository, org_name="nvidia", source="github"):
    """
    Normalizes a GitHub issue into the unified format.
    """
    issue_id = f"{source.upper()}-{org_name}-{repository}-{issue['issue_id']}"
    normalized_issue = {
        "id": issue_id,
        "source": source.lower(),
        "org": org_name,
        "type": "github_issue",
        "content": {
            "title": issue["title"],
            "description": issue["description"]
        },
        "metadata": {
            "repository": repository,
            "status": issue["status"],
            "linked_jira_ticket": issue.get("linked_jira_ticket", None)
        },
        "timestamps": {
            "created": issue["timestamp"]
        }
    }
    return normalized_issue


def normalize_github_commit(commit, repository, org_name="nvidia", source="github"):
    """
    Normalizes a GitHub commit into the unified format.
    """
    commit_id = f"{source.upper()}-{org_name}-{repository}-{commit['commit_id']}"
    normalized_commit = {
        "id": commit_id,
        "source": source.lower(),
        "org": org_name,
        "type": "github_commit",
        "content": {
            "message": commit["message"]
        },
        "metadata": {
            "repository": repository,
            "linked_jira_ticket": commit.get("linked_jira_ticket", None)
        },
        "timestamps": {
            "created": commit["timestamp"]
        }
    }
    return normalized_commit


def process_github_data(input_folder, output_folder):
    """
    Processes all GitHub data files in a folder, normalizes them, and saves to new files.
    """
    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for file_name in os.listdir(input_folder):
        input_file_path = os.path.join(input_folder, file_name)

        if not file_name.endswith(".json"):
            continue

        with open(input_file_path, "r") as infile:
            data = json.load(infile)

        github_data = data.get("github_data", [])
        normalized_data = []

        for repo_data in github_data:
            repository = repo_data["repository"]

            # Normalize issues
            for issue in repo_data.get("issues", []):
                normalized_issue = normalize_github_issue(issue, repository)
                normalized_data.append(normalized_issue)

            # Normalize commits
            for commit in repo_data.get("commits", []):
                normalized_commit = normalize_github_commit(commit, repository)
                normalized_data.append(normalized_commit)

        # Save the normalized data to a new file
        output_file_path = os.path.join(output_folder, f"normalized_{file_name}")
        with open(output_file_path, "w") as outfile:
            json.dump(normalized_data, outfile, indent=2)

        print(f"Processed and saved normalized data to {output_file_path}")


# Example usage
input_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/new_test_data/github_data"  # Replace with your input folder containing batch files
output_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/github_data"  # Replace with your desired output folder

process_github_data(input_folder, output_folder)
