from flask import Flask, request, jsonify, redirect, session
import requests
from urllib.parse import urlencode

app = Flask(__name__)
app.secret_key = "a361b70d12e2d11d2fe6da2431b17e1a"
# Temporary storage for tokens. Replace with a database in production.
tokens = {}

# Unified data structure
def structure_data(source, content_type, content):
    return {
        "source": source,
        "content_type": content_type,
        "content": content
    }

@app.route('/')
def home():
    return '''
        <a href="/google_auth">Sign in with Google</a><br>
    '''

GOOGLE_CLIENT_ID = "491890770418-mdun9hqs26bpptnpaabc1t7n9htjftob.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = "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"
GOOGLE_REDIRECT_URI = "https://127.0.0.1:5000/google_callback"
GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_API_BASE_URL = "https://www.googleapis.com"

@app.route('/google_auth')
def google_auth():
    query_params = {
        "client_id": GOOGLE_CLIENT_ID,
        "redirect_uri": GOOGLE_REDIRECT_URI,
        "response_type": "code",
        "scope": "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/activity",  # Add scopes as needed
        "access_type": "offline",
        "state": "random_state_string",
        "include_granted_scopes": "true"
    }
    auth_url = f"{GOOGLE_AUTH_URL}?{urlencode(query_params)}"
    return redirect(auth_url)

@app.route('/google_callback')
def google_callback():
    code = request.args.get("code")
    if not code:
        return "Error: Missing code parameter.", 400

    # Exchange the authorization code for an access token
    response = requests.post(
        "https://oauth2.googleapis.com/token",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data={
            "code": code,
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "redirect_uri": GOOGLE_REDIRECT_URI,
            "grant_type": "authorization_code"
        }
    )

    if response.status_code != 200:
        return f"Error fetching access token: {response.text}", 500

    token_data = response.json()
    access_token = token_data.get("access_token")
    if not access_token:
        return "Error: Access token not returned.", 400

    # Fetch user info using the access token
    user_info_response = requests.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        headers={"Authorization": f"Bearer {access_token}"}
    )

    if user_info_response.status_code != 200:
        return f"Error fetching user info: {user_info_response.text}", 500

    user_info = user_info_response.json()
    user_id = user_info.get("id")  # Unique user identifier
    user_email = user_info.get("email")  # User's email address

    # Store user data in session or elsewhere
    session["google_user_id"] = user_id
    session["google_user_email"] = user_email
    session["google_access_token"] = access_token

    # Print the user value to the console
    print(f"Google User ID: {user_id}")
    print(f"Google User Email: {user_email}")

    # You can also display it on the UI for testing purposes
    return f"Authentication successful! User ID: {user_id}, Email: {user_email}"


@app.route('/fetch_google_activity/<user>', methods=['GET'])
def fetch_google_activity(user):
    access_token = session.get("google_access_token")
    if not access_token:
        return "Error: Access token not available.", 403

    headers = {"Authorization": f"Bearer {access_token}"}

    # Example endpoint for fetching user activity (adjust as necessary)
    response = requests.get(f"{GOOGLE_API_BASE_URL}/user/activity", headers=headers)
    if response.status_code != 200:
        return f"Error fetching Google activity: {response.text}", response.status_code

    activity_data = response.json()
    structured_activity = [
        structure_data("Google", "activity", activity)
        for activity in activity_data.get("activities", [])
    ]

    return jsonify(structured_activity)

if __name__ == '__main__':
    app.run(debug=True, port=5000, ssl_context=('cert.pem', 'key.pem'))
