from flask import Flask, request, redirect, session, jsonify
from requests_oauthlib import OAuth2Session
from atlassian.jira import Jira
import requests
import logging

app = Flask(__name__)
app.secret_key = "jfijdivjdi"

##############################################################################
# JIRA OAuth 2.0 Settings (Unchanged from your code)
##############################################################################

authorization_base_url = "https://auth.atlassian.com/authorize"
token_url = "https://auth.atlassian.com/oauth/token"

client_id = "PcV8HgR90kqRJS12euBLoYhJ8J7jt1TO"
client_secret = "ATOAylK_hlX9dbtyvg9tYHIV0t9IFjkPH8t2_7Z0SjtyeljhX5b64fSWKBbWaZm-MkG0520FF758"
redirect_uri = "https://127.0.0.1:5000/callback"  # {server_url}/callback

##############################################################################
# TestRail Service Account: Global storage (NOT secure for production)
##############################################################################

TESRAIL_SERVICE_ACCOUNT = {
    "base_url": None,
    "username": None,
    "api_key": None
}

##############################################################################
# Mock Logs (for demonstration)
# Updated logs to include a "testrail_case_id" for the demonstration
##############################################################################

MOCK_LOGS = [
  {
    "test_id": "TC-LOGIN-VALID",
    "testrail_case_id": 1,
    "status": "FAIL",
    "description": "Timed out waiting for login to succeed on CI environment",
    "timestamp": "2025-01-22T08:30:00Z"
  },
  {
    "test_id": "TC-LOGIN-INVALID",
    "testrail_case_id": 2,
    "status": "PASS",
    "description": "Invalid password error displayed as expected",
    "timestamp": "2025-01-22T08:35:00Z"
  },
  {
    "test_id": "TC-CHECKOUT-INVALID-PAYMENT",
    "testrail_case_id": 3,
    "status": "ERROR",
    "description": "Caught NullPointerException in PaymentService",
    "timestamp": "2025-01-22T09:00:00Z"
  },
  {
    "test_id": "TC-CHECKOUT-VALID-PAYMENT",
    "testrail_case_id": 4,
    "status": "FAIL",
    "description": "Payment not processed - possibly environment issue or bug",
    "timestamp": "2025-01-22T09:05:00Z"
  },
  {
    "test_id": "TC-PROFILE-MISSING-FIELDS",
    "testrail_case_id": 5,
    "status": "FAIL",
    "description": "Expected error message not shown when email is removed",
    "timestamp": "2025-01-22T09:10:00Z"
  }
]


##############################################################################
# Routes for TestRail Setup & Basic UI
##############################################################################

@app.route("/testrail-setup", methods=["GET", "POST"])
def testrail_setup():
    """
    Simple form for configuring TestRail service account credentials.
    For demonstration only — store securely in production.
    """
    if request.method == "GET":
        return """
        <h2>Configure TestRail Service Account</h2>
        <form method="POST">
          <label>TestRail Base URL: 
            <input name="base_url" value="" placeholder="https://yourcompany.testrail.io" />
          </label><br/><br/>
          <label>Service Account Username:
            <input name="username" type="text" value="" />
          </label><br/><br/>
          <label>Service Account API Key:
            <input name="api_key" type="password" value="" />
          </label><br/><br/>
          <input type="submit" value="Save"/>
        </form>
        """

    # POST: save the credentials in memory (or a secure DB in real usage)
    base_url = request.form.get("base_url", "")
    username = request.form.get("username", "")
    api_key = request.form.get("api_key", "")

    TESRAIL_SERVICE_ACCOUNT["base_url"] = base_url
    TESRAIL_SERVICE_ACCOUNT["username"] = username
    TESRAIL_SERVICE_ACCOUNT["api_key"] = api_key

    return f"""
    TestRail service account configured!<br>
    Base URL: {base_url}<br>
    Username: {username}<br><br>
    <a href="/run-job">Run Job</a> to test integration.
    """

##############################################################################
# TestRail Helper Functions
##############################################################################

def get_testrail_case(case_id):
    """
    Fetches a test case from TestRail using the service account credentials.
    Raises an error if the account is not configured or if the request fails.
    """
    base_url = TESRAIL_SERVICE_ACCOUNT.get("base_url")
    username = TESRAIL_SERVICE_ACCOUNT.get("username")
    api_key = TESRAIL_SERVICE_ACCOUNT.get("api_key")

    if not (base_url and username and api_key):
        raise ValueError("TestRail service account is not configured.")

    url = f"{base_url}/index.php?/api/v2/get_case/{case_id}"
    resp = requests.get(url, auth=(username, api_key))
    resp.raise_for_status()
    return resp.json()

def fetch_testrail_info_for_log(log):
    """
    If the log has a 'testrail_case_id', fetch that case from TestRail.
    Return relevant info as a string or None if unavailable.
    """
    testrail_id = log.get("testrail_case_id")
    if not testrail_id:
        return None

    try:
        case_data = get_testrail_case(testrail_id)
        case_title = case_data.get("title", "No title")
        # Link back to the case in the UI
        case_url = f"{TESRAIL_SERVICE_ACCOUNT['base_url']}/index.php?/cases/view/{testrail_id}"
        # Return a descriptive string you can embed in Jira
        return f"**TestRail Case:** [{case_title}]({case_url}) (ID: {testrail_id})"
    except Exception as e:
        logging.error(f"Failed to fetch TestRail data for case {testrail_id}: {e}")
        return None

##############################################################################
# Jira OAuth Flow (from your original code)
##############################################################################

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


@app.route("/callback")
def callback():
    jira_oauth = OAuth2Session(client_id, state=session["oauth_state"], redirect_uri=redirect_uri)
    token_json = jira_oauth.fetch_token(
        token_url,
        client_secret=client_secret,
        authorization_response=request.url
    )
    session["token_json"] = token_json

    # Quick test after getting the token:
    search_jira(token_json, "New first one", "New first one")
    return "Successfully retrieved Jira token.<br>" \
           f"Token: {token_json}<p/>" \
           f"Projects: {', '.join(get_projects(token_json))}"


def get_projects(token_json):
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

    oauth2_dict = {
        "client_id": client_id,
        "token": {
            "access_token": token_json["access_token"],
            "token_type": "Bearer",
        },
    }
    jira = Jira(url=f"https://api.atlassian.com/ex/jira/{cloud_id}", oauth2=oauth2_dict)
    return [project["name"] for project in jira.projects()]


def search_jira(token_json, test_id, description):
    print("Current token:", token_json)
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

    oauth2_dict = {
        "client_id": client_id,
        "token": {
            "access_token": token_json["access_token"],
            "token_type": "Bearer",
        },
    }
    jira = Jira(url=f"https://api.atlassian.com/ex/jira/{cloud_id}", oauth2=oauth2_dict)

    # Basic JQL search
    jql_query = (
        f"summary ~ '{test_id}' OR "
        f"description ~ '{description[:50]}'"
    )
    search_results = jira.jql(jql=jql_query)
    print(search_results)
    return search_results.get("issues", [])


def update_jira_ticket(token_json, issue_id, status, description):
    # Same logic to fetch cloud_id
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

    oauth2_dict = {
        "client_id": client_id,
        "token": {
            "access_token": token_json["access_token"],
            "token_type": "Bearer",
        },
    }

    jira = Jira(url=f"https://api.atlassian.com/ex/jira/{cloud_id}", oauth2=oauth2_dict)

    jira.update_issue(
        issue_id,
        {
            "update": {
                "comment": [
                    {"add": {"body": f"Auto-update:\nStatus: {status}\n\n{description}"}}
                ],
                "labels": [
                    {"add": "extra_label"},
                    {"remove": "unwanted_label"}
                ]
            }
        }
    )
    print("Updated")
    return f"Updated Jira ticket '{issue_id}' with status text: {status}"


def create_jira_ticket(token_json, test_id, status, description, project_key="SCRUM"):
    req = requests.get(
        "https://api.atlassian.com/oauth/token/accessible-resources",
        headers={
            "Authorization": f"Bearer {token_json['access_token']}",
            "Accept": "application/json"
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
        }
    }

    jira = Jira(url=f"https://api.atlassian.com/ex/jira/{cloud_id}", oauth2=oauth2_dict)

    fields = {
        "project": {"key": project_key},
        "summary": f"Test {test_id} failed - Status: {status}",
        "description": description,
        "issuetype": {"name": "Bug"},
        "labels": ["automation", "QA"]
    }

    new_issue = jira.create_issue(fields=fields)
    issue_key = new_issue["key"]
    print(f"Created Jira ticket: {issue_key}")
    logging.info(f"Created Jira ticket: {issue_key} for test {test_id}")
    return issue_key

##############################################################################
# Main Sync Logic
##############################################################################

def fetch_server_logs():
    """
    Currently returns the MOCK_LOGS for demonstration.
    In real usage, you'd connect to your server or CI system to fetch logs.
    """
    print("Fetching mock logs...")
    return MOCK_LOGS

def sync_logs_with_jira():
    """
    Main function to go through each test log, fetch TestRail info, 
    then either create or update a Jira ticket.
    """
    token_json = session.get("token_json")
    if not token_json:
        raise ValueError("No Jira OAuth token found in session. Please /login first.")

    logs = fetch_server_logs()
    ticket_actions = []

    for log in logs:
        test_id = log.get("test_id")
        status = log.get("status")
        description = log.get("description")

        # 1) Fetch TestRail data, if available
        testrail_details = fetch_testrail_info_for_log(log)
        if testrail_details:
            # Append TestRail info to the description that goes into Jira
            description += f"\n\n{testrail_details}"

        # 2) Check if an existing ticket matches
        try:
            existing_ticket = search_jira(token_json, test_id, description)
            if existing_ticket:
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
    """
    Endpoint to manually trigger the job function.
    E.g., visiting http://127.0.0.1:5000/run-job
    """
    try:
        print("Manually triggered job via /run-job...")
        ticket_actions = sync_logs_with_jira()
        return jsonify({"status": "success", "message": "Job executed successfully.", "details": ticket_actions}), 200
    except Exception as e:
        print(f"Error while running job: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

##############################################################################
# Run the Flask App
##############################################################################

if __name__ == "__main__":
    app.run(debug=True, port=5000, ssl_context=('cert.pem', 'key.pem'))
