import os
import json
import random
import time
import logging
from flask import Flask, request, redirect, session, jsonify, render_template_string
from requests_oauthlib import OAuth2Session
from atlassian.jira import Jira
import requests
from apscheduler.schedulers.background import BackgroundScheduler
import openai


openai.api_key = "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"
app = Flask(__name__)
app.secret_key = "your_secure_secret_key"  # Replace with a secure secret key

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

##############################################################################
# Configuration
##############################################################################

# Jira OAuth 2.0 Settings
authorization_base_url = "https://auth.atlassian.com/authorize"
token_url = "https://auth.atlassian.com/oauth/token"

client_id = "PcV8HgR90kqRJS12euBLoYhJ8J7jt1TO"  # Replace with your actual client ID
client_secret = "ATOAylK_hlX9dbtyvg9tYHIV0t9IFjkPH8t2_7Z0SjtyeljhX5b64fSWKBbWaZm-MkG0520FF758"  # Replace with your actual client secret
redirect_uri = "https://127.0.0.1:5000/callback"  # Replace with your actual callback URL

# TestRail Service Account Configuration
TESRAIL_SERVICE_ACCOUNT = {
    "base_url": None,
    "username": None,
    "api_key": None
}

# Path to store logs (ensure this directory exists)
LOG_FOLDER = "logs"
os.makedirs(LOG_FOLDER, exist_ok=True)

# Jira Base URL (to construct issue URLs)
JIRA_BASE_URL = None  # Will be set after OAuth

# In-memory failure tracking
failure_counts = {}

##############################################################################
# TestRail Helper Functions
##############################################################################

def get_testrail_case(case_id):
    """
    Fetches a test case from TestRail using the service account credentials.
    """
    base_url = TESRAIL_SERVICE_ACCOUNT.get("base_url")
    username = TESRAIL_SERVICE_ACCOUNT.get("username")
    api_key = TESRAIL_SERVICE_ACCOUNT.get("api_key")

    if not (base_url and username and api_key):
        raise ValueError("TestRail service account is not configured.")

    url = f"{base_url}/index.php?/api/v2/get_case/{case_id}"
    response = requests.get(url, auth=(username, api_key))
    if response.status_code == 200:
        return response.json()
    else:
        raise ValueError(f"Failed to fetch TestRail case {case_id}: {response.status_code} {response.text}")

##############################################################################
# Intelligent Comment Generation
##############################################################################

def generate_intelligent_comment_ai(status, description, custom_steps):
    """
    Generates intelligent comments using OpenAI's GPT based on the test status, description, and TestRail custom steps.
    """
    prompt = f"""
    You are an automated test triage assistant. Given the test status, description, and TestRail test steps, provide a concise comment with possible causes and suggested actions.

    Status: {status}
    Description: {description}
    Test Steps:
    {custom_steps}

    Comment:
    """
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",  # or the latest available engine
            prompt=prompt,
            max_tokens=150,
            temperature=0.5,
            n=1,
            stop=None
        )
        comment = response.choices[0].text.strip()
        return f"**Auto-Triage Comment:**\n{comment}"
    except Exception as e:
        logger.error(f"AI Comment Generation Failed: {e}")
        return "Failed to generate intelligent comment."

# def generate_intelligent_comment(status, description, custom_steps):
#     """
#     Generates intelligent comments based on the test status, description, and TestRail custom steps.
#     For simplicity, this uses rule-based logic. For more advanced intelligence,
#     integrate with an AI service like OpenAI's GPT.
#     """
#     comment = f"**Auto-Triage Comment:**\n"

#     if status == "FAIL":
#         comment += "The test has failed. Possible reasons could include application bugs, environment issues, or flaky tests.\n"
#         comment += "Based on the test steps, consider the following actions:\n"
#         comment += f"{custom_steps}\n"
#         comment += "Suggested Actions:\n"
#         comment += "- Investigate recent code changes related to this feature.\n"
#         comment += "- Check environment stability and configurations.\n"
#         comment += "- Review test stability; consider retry mechanisms.\n"
#     elif status == "ERROR":
#         comment += "An error occurred during test execution. This might indicate a critical issue that needs immediate attention.\n"
#         comment += "Based on the test steps, consider the following actions:\n"
#         comment += f"{custom_steps}\n"
#         comment += "Suggested Actions:\n"
#         comment += "- Examine stack traces and logs for detailed error information.\n"
#         comment += "- Assess the impact on related functionalities.\n"
#         comment += "- Prioritize fixing this issue due to its potential severity.\n"
#     elif status == "PASS":
#         comment += "The test has passed successfully. No immediate actions required.\n"
#         comment += "Based on the test steps, consider the following confirmations:\n"
#         comment += f"{custom_steps}\n"

#     # Append the original description for context
#     comment += f"\n**Original Description:** {description}"

#     return comment

##############################################################################
# Jira OAuth Routes
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
    jira_oauth = OAuth2Session(client_id, state=session.get("oauth_state"), redirect_uri=redirect_uri)
    token_json = jira_oauth.fetch_token(
        token_url,
        client_secret=client_secret,
        authorization_response=request.url
    )
    session["token_json"] = token_json

    # Retrieve accessible resources to get Jira site URL and cloud ID
    resources = requests.get(
        "https://api.atlassian.com/oauth/token/accessible-resources",
        headers={
            "Authorization": f"Bearer {token_json['access_token']}",
            "Accept": "application/json",
        },
    ).json()

    if not resources:
        return "No accessible Jira resources found.", 400

    jira_site_url = resources[0]["url"]  # e.g., "https://startup-team.atlassian.net"
    cloud_id = resources[0]["id"]

    # Store Jira Base URL for constructing issue URLs
    global JIRA_BASE_URL
    JIRA_BASE_URL = jira_site_url

    # Store cloud_id in session for later use
    session["cloud_id"] = cloud_id

    logger.info("Jira OAuth token obtained successfully.")
    return render_template_string("""
        <h3>Successfully retrieved Jira token.</h3>
        <a href="/run-job">Run Job</a> to sync logs with Jira.<br/>
        <a href="/scheduler-status">Check Scheduler Status</a>
    """)

##############################################################################
# Jira Utility Functions
##############################################################################

def get_jira_site_url(token_json):
    """
    Retrieves the Jira site URL and cloud ID from the accessible resources.
    """
    resources = requests.get(
        "https://api.atlassian.com/oauth/token/accessible-resources",
        headers={
            "Authorization": f"Bearer {token_json['access_token']}",
            "Accept": "application/json",
        },
    ).json()
    if not resources:
        raise ValueError("No accessible Jira resources found.")
    return resources[0]["url"], resources[0]["id"]

def search_jira(token_json, test_id, description):
    """
    Searches for existing Jira issues matching the test_id or a snippet of the description.
    Returns a list of matching issues.
    """
    jira_site_url, cloud_id = get_jira_site_url(token_json)
    jira = Jira(url=f"https://api.atlassian.com/ex/jira/{cloud_id}", oauth2={
        "client_id": client_id,
        "token": {
            "access_token": token_json["access_token"],
            "token_type": "Bearer",
        },
    })

    jql_query = (
        f"summary ~ '{test_id}' OR "
        f"description ~ '{description[:50]}'"
    )
    search_results = jira.jql(jql=jql_query)
    return search_results.get("issues", [])

def update_jira_ticket(token_json, issue_id, status, description, labels, comment):
    """
    Updates an existing Jira ticket with new status, labels, and adds a comment.
    """
    jira_site_url, cloud_id = get_jira_site_url(token_json)
    jira = Jira(url=f"https://api.atlassian.com/ex/jira/{cloud_id}", oauth2={
        "client_id": client_id,
        "token": {
            "access_token": token_json["access_token"],
            "token_type": "Bearer",
        },
    })

    # Prepare the update payload
    update_payload = {
        "update": {
            "comment": [
                {"add": {"body": comment}}
            ],
            "labels": [
                {"add": label} for label in labels
            ]
        }
    }

    # Remove previous PASS/FAIL/ERROR labels to maintain current status
    # Assuming only one of these labels should exist at a time
    existing_labels = jira.get_issue(issue_id)["fields"].get("labels", [])
    status_labels = ["PASS", "FAIL", "ERROR"]
    labels_to_remove = [label for label in existing_labels if label in status_labels]
    for label in labels_to_remove:
        update_payload["update"]["labels"].append({"remove": label})

    # Update the issue
    jira.update_issue(issue_id, update_payload)
    logger.info(f"Updated Jira ticket '{issue_id}' with status '{status}' and labels {labels}.")

    # Construct Jira ticket URL
    issue_key = jira.get_issue(issue_id)["key"]
    issue_url = f"{JIRA_BASE_URL}/browse/{issue_key}"
    logger.info(f"Jira Ticket URL: {issue_url}")

    return issue_url

def create_jira_ticket(token_json, test_id, status, description, project_key="SCRUM", labels=None, comment=None):
    """
    Creates a new Jira ticket with the given details and labels.
    Returns the Jira ticket URL.
    """
    if labels is None:
        labels = ["automation", "QA"]

    jira_site_url, cloud_id = get_jira_site_url_and_cloud_id(token_json)
    jira = Jira(url=f"https://api.atlassian.com/ex/jira/{cloud_id}", oauth2={
        "client_id": client_id,
        "token": {
            "access_token": token_json["access_token"],
            "token_type": "Bearer",
        },
    })

    # Map test status to Jira issue type
    issue_type_map = {
        "PASS": "Task",    # Assuming "Task" is a valid issue type
        "FAIL": "Bug",
        "ERROR": "Bug"
    }
    issue_type = issue_type_map.get(status, "Task")

    # Determine labels based on status
    status_labels = [status]  # Add the status as a label (PASS/FAIL/ERROR)
    if failure_counts.get(test_id, 0) >= 3:
        status_labels.append("Flaky")
    labels += status_labels

    fields = {
        "project": {"key": project_key},
        "summary": f"Test {test_id}",  # Removed " - Status: {status}"
        "description": description,
        "issuetype": {"name": issue_type},
        "labels": labels
    }

    new_issue = jira.create_issue(fields=fields)
    issue_key = new_issue["key"]
    logger.info(f"Created Jira ticket: {issue_key} for test {test_id}")

    # Add an initial comment if provided
    if comment:
        jira.add_comment(issue_key, comment)

    # Construct Jira ticket URL
    issue_url = f"{JIRA_BASE_URL}/browse/{issue_key}"
    logger.info(f"Jira Ticket URL: {issue_url}")

    return issue_url


# def create_jira_ticket(token_json, test_id, status, description, project_key="SCRUM", labels=None, comment=None):
#     """
#     Creates a new Jira ticket with the given details and labels.
#     Returns the Jira ticket URL.
#     """
#     if labels is None:
#         labels = ["automation", "QA"]

#     jira_site_url, cloud_id = get_jira_site_url(token_json)
#     jira = Jira(url=f"https://api.atlassian.com/ex/jira/{cloud_id}", oauth2={
#         "client_id": client_id,
#         "token": {
#             "access_token": token_json["access_token"],
#             "token_type": "Bearer",
#         },
#     })

#     # Map test status to Jira issue type
#     issue_type_map = {
#         "PASS": "Task",    # Assuming "Task" is a valid issue type
#         "FAIL": "Bug",
#         "ERROR": "Bug"
#     }
#     issue_type = issue_type_map.get(status, "Task")

#     # Determine labels based on status
#     status_labels = [status]  # Add the status as a label (PASS/FAIL/ERROR)
#     if failure_counts.get(test_id, 0) >= 3:
#         status_labels.append("Flaky")
#     labels += status_labels

#     fields = {
#         "project": {"key": project_key},
#         "summary": f"Test {test_id} - Status: {status}",
#         "description": description,
#         "issuetype": {"name": issue_type},
#         "labels": labels
#     }

#     new_issue = jira.create_issue(fields=fields)
#     issue_key = new_issue["key"]
#     logger.info(f"Created Jira ticket: {issue_key} for test {test_id}")

#     # Add an initial comment if provided
#     if comment:
#         print("Current issue: ", issue_key)
#         jira.add_comment(issue_key, comment)

#     # Construct Jira ticket URL
#     issue_url = f"{JIRA_BASE_URL}/browse/{issue_key}"
#     logger.info(f"Jira Ticket URL: {issue_url}")

#     return issue_url

##############################################################################
# Main Sync Logic
##############################################################################

def fetch_server_logs():
    """
    Fetch logs from JSON files in the LOG_FOLDER directory.
    This simulates real-time log arrivals.
    """
    logs = []
    for filename in os.listdir(LOG_FOLDER):
        if filename.startswith("log_") and filename.endswith(".json"):
            filepath = os.path.join(LOG_FOLDER, filename)
            with open(filepath, 'r') as f:
                log_entry = json.load(f)
                logs.append(log_entry)
    return logs

def sync_logs_with_jira():
    """
    Main function to process logs, fetch TestRail data, and sync with Jira.
    Also adds 'Flaky' label based on failure counts.
    """
    token_json = session.get("token_json")
    if not token_json:
        logger.error("No Jira OAuth token found in session. Please /login first.")
        return []

    logs = fetch_server_logs()
    ticket_actions = []

    for log in logs:
        test_id = log.get("test_id")
        testrail_case_id = log.get("testrail_case_id")
        status = log.get("status")
        description = log.get("description")
        timestamp = log.get("timestamp")

        # Fetch TestRail details
        try:
            testrail_case = get_testrail_case(testrail_case_id)
            testrail_title = testrail_case.get("title", "No Title")
            testrail_steps = testrail_case.get("custom_steps", "No steps provided.")
            testrail_url = f"{TESRAIL_SERVICE_ACCOUNT['base_url']}/index.php?/cases/view/{testrail_case_id}"
            testrail_info = f"**TestRail Case:** [{testrail_title}]({testrail_url}) (ID: {testrail_case_id})\n**Test Steps:**\n{testrail_steps}"
        except Exception as e:
            logger.error(f"Failed to fetch TestRail case {testrail_case_id}: {e}")
            testrail_info = "TestRail case details not available."

        # Generate intelligent comment
        intelligent_comment = generate_intelligent_comment_ai(status, description, testrail_steps)
        # intelligent_comment = generate_intelligent_comment(status, description, testrail_steps)

        # Update failure counts
        if status in ["FAIL", "ERROR"]:
            failure_counts[test_id] = failure_counts.get(test_id, 0) + 1
        else:
            failure_counts[test_id] = 0  # Reset on PASS

        # Determine labels
        labels = []
        if status in ["PASS", "FAIL", "ERROR"]:
            labels.append(status)
        if failure_counts.get(test_id, 0) >= 3:
            labels.append("Flaky")

        # Combine descriptions
        combined_description = f"{description}\n\n{testrail_info}"

        # Construct full comment
        full_comment = intelligent_comment

        # Search for existing Jira ticket
        try:
            existing_tickets = search_jira(token_json, test_id, description)
            if existing_tickets:
                issue_id = existing_tickets[0]["id"]
                issue_key = existing_tickets[0]["key"]
                issue_url = update_jira_ticket(token_json, issue_id, status, combined_description, labels, full_comment)
                ticket_actions.append({
                    "test_id": test_id,
                    "action": "updated",
                    "issue_id": issue_id,
                    "issue_key": issue_key,
                    "issue_url": issue_url,
                    "message": "Issue updated successfully."
                })
            else:
                issue_url = create_jira_ticket(token_json, test_id, status, combined_description, labels=labels, comment=full_comment)
                # Extract issue key from URL
                issue_key = issue_url.split("/browse/")[-1]
                ticket_actions.append({
                    "test_id": test_id,
                    "action": "created",
                    "issue_id": None,
                    "issue_key": issue_key,
                    "issue_url": issue_url,
                    "message": "Issue created successfully."
                })
        except Exception as e:
            error_message = f"Error processing test {test_id}: {e}"
            logger.error(error_message)
            ticket_actions.append({
                "test_id": test_id,
                "action": "error",
                "issue_id": None,
                "issue_key": None,
                "issue_url": None,
                "message": error_message
            })

    # Clean up processed log files to prevent reprocessing
    for filename in os.listdir(LOG_FOLDER):
        if filename.startswith("log_") and filename.endswith(".json"):
            filepath = os.path.join(LOG_FOLDER, filename)
            os.remove(filepath)
            logger.info(f"Processed and removed log file: {filename}")

    return ticket_actions

##############################################################################
# Simulate New Logs Arriving
##############################################################################

def simulate_new_logs():
    """
    Simulates adding a new log entry every time it's called.
    Writes the log entry to a JSON file in the LOG_FOLDER directory.
    """
    NEW_LOGS = [
        {
            "test_id": "TC-API-ORDERS",
            "testrail_case_id": 12,
            "status": "FAIL",
            "description": "Orders endpoint returned 500.",
            "timestamp": "2025-01-22T09:15:00Z"
        },
        {
            "test_id": "TC-DASHBOARD-LOAD",
            "testrail_case_id": 13,
            "status": "PASS",
            "description": "Dashboard loaded under 2s, all widgets OK.",
            "timestamp": "2025-01-22T09:20:00Z"
        },
        {
            "test_id": "TC-NOTIFICATIONS",
            "testrail_case_id": 14,
            "status": "ERROR",
            "description": "Notifications service unreachable.",
            "timestamp": "2025-01-22T09:25:00Z"
        },
        {
            "test_id": "TC-SEARCH-FEATURE",
            "testrail_case_id": 15,
            "status": "FAIL",
            "description": "Search returned incomplete results.",
            "timestamp": "2025-01-22T09:30:00Z"
        },
        {
            "test_id": "TC-REPORTS-CSV",
            "testrail_case_id": 16,
            "status": "PASS",
            "description": "CSV export validated successfully.",
            "timestamp": "2025-01-22T09:35:00Z"
        }
    ]

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
# APScheduler for Periodic Sync
##############################################################################

# Scheduler setup
scheduler = BackgroundScheduler()

def scheduled_sync():
    logger.info("Scheduler triggered sync_logs_with_jira()")
    try:
        with app.app_context():
            # Simulate new logs arriving
            simulate_new_logs()
            # Sync logs with Jira
            ticket_actions = sync_logs_with_jira()
            logger.info(f"Scheduled Sync Actions: {ticket_actions}")
    except Exception as ex:
        logger.error(f"Scheduler encountered an exception: {ex}")

# Add the job to the scheduler
scheduler.add_job(scheduled_sync, 'interval', seconds=30)
scheduler.start()

# A route to check the scheduler status
@app.route("/scheduler-status")
def scheduler_status():
    next_run = scheduler.get_jobs()[0].next_run_time.strftime("%Y-%m-%d %H:%M:%S") if scheduler.get_jobs() else "Never"
    return jsonify({
        "scheduler": "running" if scheduler.running else "stopped",
        "next_run_at": next_run
    })

##############################################################################
# Endpoint to Manually Trigger Log Sync (Optional)
##############################################################################

@app.route('/run-job', methods=['GET'])
def run_job():
    """
    Endpoint to manually trigger the job function.
    """
    try:
        logger.info("Manually triggered job via /run-job...")
        simulate_new_logs()
        ticket_actions = sync_logs_with_jira()
        return jsonify({"status": "success", "details": ticket_actions}), 200
    except Exception as e:
        logger.error(f"Error while running job: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

##############################################################################
# TestRail Setup Route
##############################################################################

@app.route("/testrail-setup", methods=["GET", "POST"])
def testrail_setup():
    """
    Simple form for configuring TestRail service account credentials.
    Only accessible to authorized users (implement authentication as needed).
    """
    if request.method == "GET":
        return render_template_string("""
            <h2>Configure TestRail Service Account</h2>
            <form method="POST">
              <label>TestRail Base URL: 
                <input name="base_url" value="{{ base_url }}" placeholder="https://yourcompany.testrail.io" required/>
              </label><br/><br/>
              <label>Service Account Username:
                <input name="username" type="text" value="{{ username }}" required/>
              </label><br/><br/>
              <label>Service Account API Key:
                <input name="api_key" type="password" value="{{ api_key }}" required/>
              </label><br/><br/>
              <input type="submit" value="Save"/>
            </form>
        """, base_url=TESRAIL_SERVICE_ACCOUNT["base_url"] or "", username=TESRAIL_SERVICE_ACCOUNT["username"] or "", api_key=TESRAIL_SERVICE_ACCOUNT["api_key"] or "")
    
    # POST: save the credentials securely
    base_url = request.form.get("base_url", "").rstrip('/')
    username = request.form.get("username", "")
    api_key = request.form.get("api_key", "")
    
    if not (base_url and username and api_key):
        return "All fields are required.", 400
    
    TESRAIL_SERVICE_ACCOUNT["base_url"] = base_url
    TESRAIL_SERVICE_ACCOUNT["username"] = username
    TESRAIL_SERVICE_ACCOUNT["api_key"] = api_key
    
    logger.info("TestRail service account configured successfully.")
    return render_template_string("""
        <h3>TestRail service account configured successfully!</h3>
        <a href="/run-job">Run Job</a> to sync logs with Jira.
    """)

##############################################################################
# Run the Flask App
##############################################################################

if __name__ == "__main__":
    # Ensure TestRail Service Account is configured
    if not (TESRAIL_SERVICE_ACCOUNT["base_url"] and TESRAIL_SERVICE_ACCOUNT["username"] and TESRAIL_SERVICE_ACCOUNT["api_key"]):
        logger.warning("TestRail service account is not configured. Visit /testrail-setup to configure.")
    
    # Run the Flask app (Debug + SSL context for local usage)
    # APScheduler will run in background threads
    app.run(debug=True, port=5000, ssl_context=('cert.pem', 'key.pem'))
