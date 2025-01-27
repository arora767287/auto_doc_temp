from flask import Flask, request, redirect, session, jsonify
from requests_oauthlib import OAuth2Session
from atlassian.jira import Jira
import requests
import logging
import random
import time
import os
import json

# APScheduler for periodic tasks
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Replace with a secure secret key

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

##############################################################################
# JIRA OAuth 2.0 Settings
##############################################################################

authorization_base_url = "https://auth.atlassian.com/authorize"
token_url = "https://auth.atlassian.com/oauth/token"

client_id = "PcV8HgR90kqRJS12euBLoYhJ8J7jt1TO"  # Replace with your Jira OAuth client ID
client_secret = "ATOAylK_hlX9dbtyvg9tYHIV0t9IFjkPH8t2_7Z0SjtyeljhX5b64fSWKBbWaZm-MkG0520FF758"  # Replace with your Jira OAuth client secret
redirect_uri = "https://127.0.0.1:5000/callback"  # Adjust as needed

##############################################################################
# TestRail Service Account (Global, not secure)
##############################################################################

TESRAIL_SERVICE_ACCOUNT = {
    "base_url": None,
    "username": None,
    "api_key": None
}

##############################################################################
# Log Folders Setup
##############################################################################

LOG_FOLDER = "logs"
PROCESSED_FOLDER = os.path.join(LOG_FOLDER, "processed")
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

##############################################################################
# Mock Logs (Initial and New)
##############################################################################
# Define log entries corresponding to TestRail test cases
INITIAL_LOGS = [
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

NEW_LOGS = [
    {
        "test_id": "TC-API-ORDERS",
        "testrail_case_id": 6,
        "status": "FAIL",
        "description": "Orders endpoint returned 500.",
        "timestamp": "2025-01-22T09:15:00Z"
    },
    {
        "test_id": "TC-DASHBOARD-LOAD",
        "testrail_case_id": 7,
        "status": "PASS",
        "description": "Dashboard loaded under 2s, all widgets OK.",
        "timestamp": "2025-01-22T09:20:00Z"
    },
    {
        "test_id": "TC-NOTIFICATIONS",
        "testrail_case_id": 8,
        "status": "ERROR",
        "description": "Notifications service unreachable.",
        "timestamp": "2025-01-22T09:25:00Z"
    },
    {
        "test_id": "TC-SEARCH-FEATURE",
        "testrail_case_id": 9,
        "status": "FAIL",
        "description": "Search returned incomplete results.",
        "timestamp": "2025-01-22T09:30:00Z"
    },
    {
        "test_id": "TC-REPORTS-CSV",
        "testrail_case_id": 10,
        "status": "PASS",
        "description": "CSV export validated successfully.",
        "timestamp": "2025-01-22T09:35:00Z"
    }
]

##############################################################################
# Simulate new logs arriving
##############################################################################

def simulate_new_logs():
    """
    Simulates adding a new log entry every time it's called.
    Writes the log entry to a JSON file in the logs folder.
    """
    new_log = random.choice(NEW_LOGS).copy()
    # Random chance to flip PASS to FAIL or ERROR to simulate flakiness
    if new_log["status"] == "PASS" and random.random() < 0.3:
        new_log["status"] = random.choice(["FAIL", "ERROR"])
    
    # Assign current UTC timestamp
    new_log["timestamp"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    
    # Write the log to a file
    timestamp = int(time.time())
    log_filename = f"log_{timestamp}.json"
    log_path = os.path.join(LOG_FOLDER, log_filename)
    
    with open(log_path, 'w') as f:
        json.dump(new_log, f, indent=4)
    
    logger.info(f"Simulated new log: {new_log} -> {log_filename}")

##############################################################################
# TestRail Setup & Helper Routes
##############################################################################

@app.route("/testrail-setup", methods=["GET", "POST"])
def testrail_setup():
    """
    Simple form for configuring TestRail service account credentials.
    (For demonstration only — not secure for production.)
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
    
    # POST - save credentials
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

def get_testrail_case(case_id):
    """
    Fetches a test case from TestRail using the service account credentials.
    Raises ValueError if not configured, or requests exceptions if fails.
    """
    base_url = TESRAIL_SERVICE_ACCOUNT.get("base_url")
    username = TESRAIL_SERVICE_ACCOUNT.get("username")
    api_key = TESRAIL_SERVICE_ACCOUNT.get("api_key")
    
    if not (base_url and username and api_key):
        raise ValueError("TestRail service account is not configured. Go to /testrail-setup.")
    
    url = f"{base_url}/index.php?/api/v2/get_case/{case_id}"
    resp = requests.get(url, auth=(username, api_key))
    resp.raise_for_status()
    return resp.json()

def fetch_testrail_info_for_log(log):
    """
    If the log has a 'testrail_case_id', fetch from TestRail.
    Return a string to embed in Jira's description.
    """
    testrail_id = log.get("testrail_case_id")
    if not testrail_id:
        return None
    
    try:
        case_data = get_testrail_case(testrail_id)
        case_title = case_data.get("title", "No title")
        case_url = f"{TESRAIL_SERVICE_ACCOUNT['base_url']}/index.php?/cases/view/{testrail_id}"
        return f"**TestRail Case:** [{case_title}]({case_url}) (ID: {testrail_id})"
    except Exception as e:
        logging.error(f"Failed to fetch TestRail data for case {testrail_id}: {e}")
        return None

##############################################################################
# JIRA OAuth Flow
##############################################################################

# Global token storage (for demo purposes; use a database in production)
GLOBAL_TOKEN = None

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
    jira_oauth = OAuth2Session(client_id, state=session.get("oauth_state"), redirect_uri=redirect_uri)
    try:
        token_json = jira_oauth.fetch_token(
            token_url,
            client_secret=client_secret,
            authorization_response=request.url
        )
    except Exception as e:
        logger.error(f"Error fetching token: {e}")
        return f"Error fetching token: {e}", 400
    
    session["token_json"] = token_json
    global GLOBAL_TOKEN
    GLOBAL_TOKEN = token_json  # Store globally for scheduler access

    return (
        "Successfully retrieved Jira token.<br>"
        f"Token: {token_json}<br><br>"
        "<a href='/run-job'>Run Job Manually</a> | "
        "<a href='/scheduler-status'>Check Scheduler</a>"
    )

##############################################################################
# JIRA Helper Functions
##############################################################################

def get_projects(token_json):
    """
    Example function to list user-accessible projects.
    """
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
    """
    Searches Jira by test_id or partial description, returning any matching issues.
    """
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
    """
    Adds a comment to an existing Jira issue, indicating the new test status and description.
    """
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
    logger.info(f"Updated Jira issue '{issue_id}'")
    return f"Updated Jira ticket '{issue_id}'"

def create_jira_ticket(token_json, test_id, status, description, project_key="SCRUM"):
    """
    Creates a new Jira ticket with the specified summary, description, etc.
    """
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
    logger.info(f"Created Jira ticket: {issue_key} for test {test_id}")
    return issue_key

##############################################################################
# Log Processing Functions
##############################################################################

def process_log_file(log_path, token_json):
    """
    Processes a single log file: reads the log, fetches TestRail info,
    creates or updates a Jira ticket.
    After processing, moves the log file to the processed folder.
    """
    try:
        with open(log_path, 'r') as f:
            log = json.load(f)
    except Exception as e:
        logger.error(f"Failed to read log file {log_path}: {e}")
        return {"status": "error", "file": log_path, "error": str(e)}
    
    test_id = log.get("test_id")
    status = log.get("status")
    description = log.get("description")
    
    # Fetch TestRail details
    testrail_details = fetch_testrail_info_for_log(log)
    if testrail_details:
        description += f"\n\n{testrail_details}"
    
    try:
        existing_tickets = search_jira(token_json, test_id, description)
        if existing_tickets:
            issue_id = existing_tickets[0]["id"]
            msg = update_jira_ticket(token_json, issue_id, status, description)
            action = "updated"
            issue_id = issue_id
        else:
            ticket_key = create_jira_ticket(token_json, test_id, status, description)
            action = "created"
            issue_id = ticket_key
        logger.info(f"Processed log {log_path}: {action} Jira issue {issue_id}")
        action_result = {
            "status": "success",
            "file": log_path,
            "action": action,
            "issue_id": issue_id
        }
    except Exception as e:
        error_message = f"Error processing log {log_path}: {e}"
        logger.error(error_message)
        action_result = {
            "status": "error",
            "file": log_path,
            "error": str(e)
        }
    
    # Move the processed log file to the processed folder
    try:
        processed_path = os.path.join(PROCESSED_FOLDER, os.path.basename(log_path))
        os.rename(log_path, processed_path)
        logger.info(f"Moved log file {log_path} to {processed_path}")
    except Exception as e:
        logger.error(f"Failed to move log file {log_path} to {PROCESSED_FOLDER}: {e}")
    
    return action_result

def process_all_logs():
    """
    Processes all unprocessed log files in the logs folder.
    """
    token_json = GLOBAL_TOKEN
    if not token_json:
        logger.error("No Jira OAuth token found. Please /login first.")
        return []
    
    ticket_actions = []
    
    for filename in os.listdir(LOG_FOLDER):
        if filename.endswith(".json"):
            log_path = os.path.join(LOG_FOLDER, filename)
            result = process_log_file(log_path, token_json)
            ticket_actions.append(result)
    
    return ticket_actions

##############################################################################
# Routes
##############################################################################

@app.route('/run-job', methods=['GET'])
def run_job():
    """
    Manually trigger the job (e.g., from a browser).
    """
    try:
        logger.info("Manually triggered job via /run-job...")
        ticket_actions = process_all_logs()
        return jsonify({"status": "success", "details": ticket_actions}), 200
    except Exception as e:
        logger.error(f"Error while running job: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/scheduler-status")
def scheduler_status():
    """
    Check when the scheduler last ran.
    """
    global last_scheduler_run
    return jsonify({
        "scheduler": "running",
        "last_run_at": last_scheduler_run
    })

##############################################################################
# APScheduler for Periodic Sync and Log Generation
##############################################################################

# Initialize the scheduler
scheduler = BackgroundScheduler()

def scheduled_generate_logs():
    """
    Scheduler job to generate new logs every 30 seconds.
    """
    simulate_new_logs()

def scheduled_sync():
    """
    Scheduler job to process all logs every 30 seconds.
    """
    global last_scheduler_run
    last_scheduler_run = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    logger.info(f"[SCHEDULER] Running sync at {last_scheduler_run}")
    try:
        if GLOBAL_TOKEN:
            ticket_actions = process_all_logs()
            logger.info(f"[SCHEDULER] Processed logs: {ticket_actions}")
        else:
            logger.warning("[SCHEDULER] No Jira OAuth token available. Skipping sync.")
    except Exception as ex:
        logger.error(f"[SCHEDULER] Exception during sync: {ex}")

# Schedule log generation every 30 seconds
scheduler.add_job(scheduled_generate_logs, 'interval', seconds=30, id='log_generator')

# Schedule log processing every 30 seconds
scheduler.add_job(scheduled_sync, 'interval', seconds=30, id='log_processor')

# Start the scheduler
scheduler.start()

##############################################################################
# Run the Flask App
##############################################################################

if __name__ == "__main__":
    # In production, use a real server (gunicorn, etc.) & store secrets properly.
    app.run(debug=True, port=5000, ssl_context=('cert.pem', 'key.pem'))
