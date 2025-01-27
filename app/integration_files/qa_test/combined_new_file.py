"""
    Example server with Flask demonstrating use of Jira OAuth 2.0.
    Server needs to be deployed. Example code is requesting access token from
    Jira. User has to grant access rights. After authorization the
    token and Using access token, Jira cloud ID is identified and
    the available projects are returned.
"""

from requests_oauthlib import OAuth2Session
from atlassian.jira import Jira
from flask import Flask, request, redirect, session, jsonify
import requests
import logging

app = Flask(__name__)
app.secret_key = "jfijdivjdi"

# JIRA OAuth URLs
authorization_base_url = "https://auth.atlassian.com/authorize"
token_url = "https://auth.atlassian.com/oauth/token"
"""
 Create OAuth 2.0 Integration in Atlassian developer console
 https://developer.atlassian.com/console/myapps/
    - Click Authorization →  “Configure” under OAuth 2.0 and
    - Enter callback url  {server}/callback and save
    - Click “Permissions” and Add “Jira platform REST API” and other required permissions.
    - Click “Configure” under Jira platform REST API and Add permissions like
        "View user profiles", "View Jira issue data" and  “Create and manage issues”
    - Goto setting and copy client id and secret.
"""
client_id = "PcV8HgR90kqRJS12euBLoYhJ8J7jt1TO"
client_secret = "ATOAylK_hlX9dbtyvg9tYHIV0t9IFjkPH8t2_7Z0SjtyeljhX5b64fSWKBbWaZm-MkG0520FF758"
redirect_uri = "https://127.0.0.1:5000/callback"  # {server_url}/callback

"""
    2. Redirect to Jira for authorization
    The server request to {server_url}/login is redirected to Jira.
    The user is asked to grant access permissions.
"""


@app.route("/login")
def login():
    scope = ["read:me", "read:jira-user", "read:jira-work", "write:jira-work", "offline_access"]
    audience = "api.atlassian.com"

    jira_oauth = OAuth2Session(client_id, scope=scope, redirect_uri=redirect_uri)
    authorization_url, state = jira_oauth.authorization_url(
        authorization_base_url,
        audience=audience,
    )
    session["oauth_state"] = state
    return redirect(authorization_url)


"""
    3. Jira redirects user to callback url with authorization code
    This should be set to {server_url}/callback.
    Access token is fetched using authorization code
"""


@app.route("/callback")
def callback():
    jira_oauth = OAuth2Session(client_id, state=session["oauth_state"], redirect_uri=redirect_uri)
    # token_json = jira_oauth.fetch_token(token_url, client_secret=client_secret, authorization_response=request.url)
    token_json = jira_oauth.fetch_token(
        token_url,
        client_secret=client_secret,
        authorization_response=request.url
    )
    # Store the token in session for later use
    session["token_json"] = token_json
    #test_id, description
    search_jira(token_json, "New first one", "New first one")
    return "Token: {}<p />Projects: {}".format(token_json, ", ".join(get_projects(token_json)))


"""
    4. Access Token used for Jira Python API
    Using access token, accessible resources are fetched and
    First resource id is taken as jira cloud id,
    Jira Client library is called with  jira cloud id and token information.
"""


def get_projects(token_json):
    req = requests.get(
        "https://api.atlassian.com/oauth/token/accessible-resources",
        headers={
            "Authorization": "Bearer {}".format(token_json["access_token"]),
            "Accept": "application/json",
        },
    )
    req.raise_for_status()
    resources = req.json()
    cloud_id = resources[0]["id"]

    oauth2_dict = {
        "client_id": client_id,
        "token": {
            "access_token": token_json["access_token"],
            "token_type": "Bearer",
        },
    }
    jira = Jira(url="https://api.atlassian.com/ex/jira/{}".format(cloud_id), oauth2=oauth2_dict)
    return [project["name"] for project in jira.projects()]

def search_jira(token_json, test_id, description):
    print("Current token")
    print(token_json)
    # 1. Fetch list of accessible resources to get the cloud_id
    req = requests.get(
        "https://api.atlassian.com/oauth/token/accessible-resources",
        headers={
            "Authorization": "Bearer {}".format(token_json["access_token"]),
            "Accept": "application/json",
        },
    )
    print("Running jira")
    req.raise_for_status()
    resources = req.json()
    cloud_id = resources[0]["id"]

    # 2. Create the oauth2_dict needed by atlassian-python-api
    oauth2_dict = {
        "client_id": client_id,  # Same client_id as in your original code
        "token": {
            "access_token": token_json["access_token"],
            "token_type": "Bearer",
        },
    }
    # 3. Instantiate the Jira client
    jira = Jira(
        url=f"https://api.atlassian.com/ex/jira/{cloud_id}",
        oauth2=oauth2_dict
    )

    # 4. Define a JQL query, mirroring your original example
    # jql_query = (
    #     f"summary ~ '{test_id}' OR "
    #     f"description ~ '{description[:50]}' OR "
    #     f"labels in ('automation', 'QA')"
    # )

    jql_query = (
        f"summary ~ '{test_id}' OR "
        f"description ~ '{description[:50]}'"
        # f"labels in ('automation', 'QA')"
    )

    # 5. Use the Jira client to run a JQL search
    # Note: jira.jql(...) returns a dict, typically with 'issues' key
    search_results = jira.jql(jql=jql_query)

    # Return the raw result or just the issues
    # The structure is typically {"issues": [...], "maxResults": ..., "total": ...}
    print(search_results)
    return search_results.get("issues", [])


def update_jira_ticket(token_json, issue_id, status, description):
    # 1. Fetch the Jira Cloud ID from the accessible-resources endpoint
    req = requests.get(
        "https://api.atlassian.com/oauth/token/accessible-resources",
        headers={
            "Authorization": f"Bearer {token_json['access_token']}",
            "Accept": "application/json",
        },
    )
    req.raise_for_status()
    resources = req.json()
    cloud_id = resources[0]["id"]

    # 2. Build the OAuth dict required by atlassian-python-api
    oauth2_dict = {
        "client_id": client_id,  # same client_id as in your working code
        "token": {
            "access_token": token_json["access_token"],
            "token_type": "Bearer",
        },
    }

    # 3. Initialize the Jira client
    jira = Jira(
        url=f"https://api.atlassian.com/ex/jira/{cloud_id}",
        oauth2=oauth2_dict
    )

    # 4. Update the issue's description field (embedding status in text)
    jira.update_issue(
        issue_id,
        {
            "update": {
                "comment": [
                    {"add": {"body": "This is an added comment via 'update' param"}}
                ],
                "labels": [
                    {"add": "extra_label"},
                    {"remove": "unwanted_label"}
                ]
            }
        }
    )

    print("Updated")

    # Optionally return or log a success message
    return f"Updated Jira ticket '{issue_id}' with status text: {status}"


def create_jira_ticket(token_json, test_id, status, description, project_key="SCRUM"):
    """
    Creates a new Jira issue in the specified project using 3LO OAuth token.
    :param token_json: The JSON object containing the OAuth access token (e.g., from callback).
    :param test_id: A unique test identifier to include in the summary.
    :param status: A status string (e.g. "Failed", "Passed") to include in the summary.
    :param description: The text body of the issue.
    :param project_key: The Jira project key in which to create the issue (default is 'TEST').
    :return: The newly created issue key (e.g. "TEST-123").
    """

    # 1. Call accessible-resources to get the cloud_id
    resp = requests.get(
        "https://api.atlassian.com/oauth/token/accessible-resources",
        headers={
            "Authorization": f"Bearer {token_json['access_token']}",
            "Accept": "application/json"
        },
    )
    resp.raise_for_status()
    resources = resp.json()
    cloud_id = resources[0]["id"]

    # 2. Construct the OAuth2 dict that atlassian-python-api expects
    oauth2_dict = {
        "client_id": client_id,  # same client_id used in your original code
        "token": {
            "access_token": token_json["access_token"],
            "token_type": "Bearer",
        }
    }

    # 3. Initialize the Jira client
    jira = Jira(
        url=f"https://api.atlassian.com/ex/jira/{cloud_id}",
        oauth2=oauth2_dict
    )

    # 4. Define fields for the new issue
    fields = {
        "project": {"key": project_key},
        "summary": f"Test {test_id} failed - Status: {status}",
        "description": description,
        "issuetype": {"name": "Bug"},
        "labels": ["automation", "QA"]
    }

    # 5. Create the issue
    new_issue = jira.create_issue(fields=fields)

    # 6. The returned object is typically a dict with various keys; 
    #    "key" is your new issue key (e.g., "TEST-123").
    issue_key = new_issue["key"]

    print(f"Created Jira ticket: {issue_key}")
    logging.info(f"Created Jira ticket: {issue_key} for test {test_id}")
    return issue_key

# Mock Logs for Testing
MOCK_LOGS = [
    {"test_id": "New first one", "status": "FAIL", "description": "Timeout error during login test."},
    {"test_id": "TC002", "status": "PASS", "description": "Login test passed successfully."},
    {"test_id": "TC003", "status": "ERROR", "description": "NullPointerException at Checkout.java:42"}
]

# Fetch Logs (Mocked for Testing)
def fetch_server_logs():
    """Fetch mock logs for testing purposes."""
    print("Fetching mock logs...")
    return MOCK_LOGS

def sync_logs_with_jira():
    # jira_oauth = OAuth2Session(client_id, state=session["oauth_state"], redirect_uri=redirect_uri)
    token_json = session.get("token_json")
    print(token_json)
    # token_json = jira_oauth.fetch_token(token_url, client_secret=client_secret, authorization_response=request.url)
    logs = fetch_server_logs()
    ticket_actions = []

    for log in logs:
        test_id = log.get("test_id")
        status = log.get("status")
        description = log.get("description")

        try:
            existing_ticket = search_jira(token_json, test_id, description)
            if existing_ticket:
                print("Current ticket")
                print(existing_ticket)
                issue_id = existing_ticket[0]["id"]
                update_jira_ticket(token_json, issue_id, status, description)
                ticket_actions.append({"test_id": test_id, "action": "updated", "issue_id": issue_id})
            else:
                ticket_key = create_jira_ticket(token_json, test_id, status, description)
                ticket_actions.append({"test_id": test_id, "action": "created", "issue_id": ticket_key})
        except Exception as e:
            error_message = f"Error processing test {test_id}: {e}"
            logging.error(error_message)
            ticket_actions.append({"test_id": test_id, "action": "error", "error": str(e)})

    return ticket_actions

@app.route('/run-job', methods=['GET'])
def run_job():
    """Endpoint to manually trigger the job function."""
    try:
        print("Manually triggered job via /run-job...")
        ticket_actions = sync_logs_with_jira()
        return jsonify({"status": "success", "message": "Job executed successfully.", "details": ticket_actions}), 200
    except Exception as e:
        print(f"Error while running job: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000, ssl_context=('cert.pem', 'key.pem'))