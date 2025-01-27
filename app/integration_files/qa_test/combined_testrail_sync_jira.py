from flask import Flask, request, redirect, session, jsonify
from requests_oauthlib import OAuth2Session
from atlassian.jira import Jira
import requests
import logging
import random
import time

# APScheduler for periodic tasks
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)
app.secret_key = "jfijdivjdi"

##############################################################################
# JIRA OAuth 2.0 Settings (your existing config)
##############################################################################

authorization_base_url = "https://auth.atlassian.com/authorize"
token_url = "https://auth.atlassian.com/oauth/token"

client_id = "PcV8HgR90kqRJS12euBLoYhJ8J7jt1TO"
client_secret = "ATOAylK_hlX9dbtyvg9tYHIV0t9IFjkPH8t2_7Z0SjtyeljhX5b64fSWKBbWaZm-MkG0520FF758"
redirect_uri = "https://127.0.0.1:5000/callback"  # {server_url}/callback

##############################################################################
# Expanded Mock Logs
##############################################################################
# We'll keep two sets of logs to simulate "new" logs arriving over time.
# The main idea is that each run we might shuffle or add an entry from "NEW_LOGS".

INITIAL_LOGS = [
    {"test_id": "TC-LOGIN-VALID", "status": "FAIL",  "description": "Login test timed out."},
    {"test_id": "TC-LOGIN-INVALID", "status": "PASS", "description": "Invalid password error displayed correctly."},
    {"test_id": "TC-CHECKOUT-INVALID-PAYMENT", "status": "ERROR", "description": "Unexpected NullPointerException in PaymentService."},
    {"test_id": "TC-CHECKOUT-VALID-PAYMENT",   "status": "FAIL",  "description": "Payment attempt was not processed."},
    {"test_id": "TC-PROFILE-MISSING-FIELDS",   "status": "FAIL",  "description": "Expected error message not shown when email is removed."}
]

NEW_LOGS = [
    {"test_id": "TC-API-ORDERS",  "status": "FAIL",  "description": "Orders endpoint returned 500."},
    {"test_id": "TC-DASHBOARD-LOAD", "status": "PASS","description": "Dashboard loaded under 2s, all widgets OK."},
    {"test_id": "TC-NOTIFICATIONS",  "status": "ERROR","description": "Notifications service unreachable."},
    {"test_id": "TC-SEARCH-FEATURE", "status": "FAIL", "description": "Search returned incomplete results."},
    {"test_id": "TC-REPORTS-CSV",    "status": "PASS", "description": "CSV export validated successfully."}
]

# We'll store the logs in memory.
MOCK_LOGS = INITIAL_LOGS[:]  # start with the initial set

##############################################################################
# A function to simulate new logs arriving
##############################################################################

def simulate_new_logs():
    """
    For demo, each time it's called, it picks one random entry from NEW_LOGS 
    and appends to MOCK_LOGS with a potentially updated status.
    """
    new_log = random.choice(NEW_LOGS).copy()
    # random chance to flip the status to FAIL/ERROR to simulate instability
    if new_log["status"] == "PASS" and random.random() < 0.3:
        new_log["status"] = random.choice(["FAIL", "ERROR"])
    # Add to the main logs
    MOCK_LOGS.append(new_log)
    print(f"[simulate_new_logs] Added new log: {new_log}")

##############################################################################
# Additional: We'll store a "last run" timestamp so we can see when scheduler ran
##############################################################################
last_scheduler_run = None

##############################################################################
# TestRail Integration Stubs (Optional)
##############################################################################
# For brevity, let's assume we skip TestRail in this snippet or just add placeholders.

# TESRAIL_SERVICE_ACCOUNT = {...}
# def get_testrail_case(case_id): ...
# def fetch_testrail_info_for_log(log): ...

##############################################################################
# JIRA OAuth Routes (Unchanged)
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
    return ("Successfully retrieved Jira token.<br>"
            f"Token: {token_json}<br><br>"
            "<a href='/run-job'>Run Job Manually</a> | "
            "<a href='/scheduler-status'>Check Scheduler</a>")

##############################################################################
# JIRA Utility Functions
##############################################################################

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

    jql_query = (
        f"summary ~ '{test_id}' OR "
        f"description ~ '{description[:50]}'"
    )
    search_results = jira.jql(jql=jql_query)
    return search_results.get("issues", [])


def update_jira_ticket(token_json, issue_id, status, description):
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
                ]
            }
        }
    )
    print("Updated")
    return f"Updated Jira ticket '{issue_id}'"


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
    logging.info(f"Created Jira ticket: {issue_key} for test {test_id}")
    return issue_key


##############################################################################
# Main Sync Logic
##############################################################################

def fetch_server_logs():
    """
    Return the global MOCK_LOGS. 
    In a real system, you'd fetch from an actual server or CI system.
    """
    return MOCK_LOGS

def sync_logs_with_jira():
    """
    Goes through each test log, tries to find or create Jira tickets.
    We'll also simulate new logs each time to show dynamic behavior.
    """
    token_json = session.get("token_json")
    if not token_json:
        logging.error("No Jira OAuth token in session - skipping sync.")
        return []

    logs = fetch_server_logs()
    ticket_actions = []

    # (Optional) For each run, simulate that we just got 1 new log from environment:
    simulate_new_logs()

    for log in logs:
        test_id = log.get("test_id")
        status = log.get("status")
        description = log.get("description")

        try:
            existing_ticket = search_jira(token_json, test_id, description)
            if existing_ticket:
                issue_id = existing_ticket[0]["id"]
                msg = update_jira_ticket(token_json, issue_id, status, description)
                ticket_actions.append({"test_id": test_id, "action": "updated", "issue_id": issue_id, "message": msg})
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
        ticket_actions = sync_logs_with_jira()
        return jsonify({"status": "success", "details": ticket_actions}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

##############################################################################
# APScheduler for Periodic Sync
##############################################################################

# We'll schedule sync_logs_with_jira() every 30 seconds
scheduler = BackgroundScheduler()

def scheduled_sync():
    global last_scheduler_run
    last_scheduler_run = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    print(f"[SCHEDULER] Running sync at {last_scheduler_run}")
    try:
        # We'll do a "fake session" approach for demonstration,
        # or skip if no token was saved by any user.
        with app.app_context():
            if "token_json" in session:
                # If you want to run it for a single user, do this
                sync_logs_with_jira()
            else:
                print("No token in session. Typically you'd store tokens in DB.")
    except Exception as ex:
        print(f"[SCHEDULER] Exception: {ex}")

# Add the job to the scheduler
scheduler.add_job(scheduled_sync, 'interval', seconds=30)
scheduler.start()

# A route to check the scheduler status
@app.route("/scheduler-status")
def scheduler_status():
    global last_scheduler_run
    return jsonify({
        "scheduler": "running",
        "last_run_at": last_scheduler_run
    })

##############################################################################
# Run the Flask App
##############################################################################

if __name__ == "__main__":
    # Run the Flask app (Debug + SSL context for local usage)
    # APScheduler will run in background threads
    app.run(debug=True, port=5000, ssl_context=('cert.pem', 'key.pem'))
