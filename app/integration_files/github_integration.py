from flask import Flask, request, jsonify, redirect
import requests
from urllib.parse import urlencode

app = Flask(__name__)
app.secret_key = "a361b70d12e2d11d2fe6da2431b17e1a"

GITHUB_CLIENT_ID = "Ov23liiysxXMWNBXIIq1"
GITHUB_CLIENT_SECRET = "6c50a15a345888a408043df74129e7bb3fc41a7e"
GITHUB_REDIRECT_URI = "https://127.0.0.1:5000/github_callback"
GITHUB_API_BASE_URL = "https://api.github.com"

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
        <a href="/github_auth">Sign in with GitHub</a><br>
    '''

# Route to initiate GitHub OAuth flow
@app.route('/github_auth')
def github_auth():
    query_params = {
        "client_id": GITHUB_CLIENT_ID,
        "redirect_uri": GITHUB_REDIRECT_URI,
        "scope": "repo read:org user",
        "state": "random_state_string"
    }
    auth_url = f"https://github.com/login/oauth/authorize?{urlencode(query_params)}"
    return redirect(auth_url)

# Callback route to handle GitHub OAuth response
@app.route('/github_callback')
def github_callback():
    code = request.args.get("code")
    if not code:
        return "Error: Missing code parameter.", 400

    # Exchange the authorization code for an access token
    response = requests.post(
        "https://github.com/login/oauth/access_token",
        headers={"Accept": "application/json"},
        json={
            "client_id": GITHUB_CLIENT_ID,
            "client_secret": GITHUB_CLIENT_SECRET,
            "code": code,
            "redirect_uri": GITHUB_REDIRECT_URI
        }
    )
    if response.status_code != 200:
        return f"Error fetching access token: {response.text}", 500

    data = response.json()
    access_token = data.get("access_token")
    if not access_token:
        return f"Error: No access token returned. Response: {data}", 400

    # Use access token to fetch user details
    headers = {"Authorization": f"Bearer {access_token}"}
    user_response = requests.get(f"{GITHUB_API_BASE_URL}/user", headers=headers)
    if user_response.status_code != 200:
        return f"Error fetching user details: {user_response.text}", 500

    user_data = user_response.json()
    username = user_data.get("login")

    # Store the user's access token securely
    tokens[username] = access_token
    print(f"Stored token for user: {username}")

    return f"GitHub authentication successful for user {username}! Access token stored."

@app.route('/fetch_github_repos/<user>', methods=['GET'])
def fetch_github_repos(user):
    access_token = tokens.get(user)
    if not access_token:
        return f"Error: No token available for user {user}.", 404

    headers = {"Authorization": f"Bearer {access_token}"}

    # Fetch all repositories the user has access to
    repos_response = requests.get(f"{GITHUB_API_BASE_URL}/user/repos", headers=headers)
    if repos_response.status_code != 200:
        return f"Error fetching repositories: {repos_response.text}", repos_response.status_code

    repos = repos_response.json()
    structured_repos = [
        structure_data("GitHub", "repository", {
            "id": repo.get("id"),
            "name": repo.get("name"),
            "full_name": repo.get("full_name"),
            "private": repo.get("private"),
            "description": repo.get("description")
        })
        for repo in repos
    ]

    return jsonify(structured_repos)


@app.route('/fetch_github_commits_all/<user>', methods=['GET'])
def fetch_github_commits_all(user):
    access_token = tokens.get(user)
    if not access_token:
        return f"Error: No token available for user {user}.", 404

    headers = {"Authorization": f"Bearer {access_token}"}

    # Fetch all repositories first
    repos_response = requests.get(f"{GITHUB_API_BASE_URL}/user/repos", headers=headers)
    if repos_response.status_code != 200:
        return f"Error fetching repositories: {repos_response.text}", repos_response.status_code

    repos = repos_response.json()
    all_commits = []

    for repo in repos:
        repo_name = repo.get("full_name")
        commits_response = requests.get(f"{GITHUB_API_BASE_URL}/repos/{repo_name}/commits", headers=headers)
        if commits_response.status_code != 200:
            print(f"Error fetching commits for repo {repo_name}: {commits_response.text}")
            continue

        commits = commits_response.json()
        structured_commits = [
            structure_data("GitHub", "commit", {
                "repository": repo_name,
                "sha": commit.get("sha"),
                "message": commit.get("commit", {}).get("message"),
                "author": commit.get("commit", {}).get("author", {}).get("name"),
                "timestamp": commit.get("commit", {}).get("author", {}).get("date")
            })
            for commit in commits
        ]
        all_commits.extend(structured_commits)

    return jsonify(all_commits)


# Route to fetch user's issues
@app.route('/github/issues/<user>', methods=['GET'])
def fetch_github_issues(user):
    access_token = tokens.get(user)
    if not access_token:
        return f"Error: No token available for user {user}.", 404

    headers = {"Authorization": f"Bearer {access_token}"}

    # Fetch issues assigned to the user
    issues_response = requests.get(f"{GITHUB_API_BASE_URL}/issues", headers=headers)
    if issues_response.status_code != 200:
        return f"Error fetching issues: {issues_response.text}", issues_response.status_code

    issues = issues_response.json()
    structured_issues = [
        structure_data("GitHub", "issue", issue)
        for issue in issues
    ]

    return jsonify(structured_issues)

# Route to fetch user's commits from a specific repository
@app.route('/github/commits/<user>/<repo>', methods=['GET'])
def fetch_github_commits(user, repo):
    access_token = tokens.get(user)
    if not access_token:
        return f"Error: No token available for user {user}.", 404

    headers = {"Authorization": f"Bearer {access_token}"}

    commits_response = requests.get(f"{GITHUB_API_BASE_URL}/repos/{user}/{repo}/commits", headers=headers)
    if commits_response.status_code != 200:
        return f"Error fetching commits: {commits_response.text}", commits_response.status_code

    commits = commits_response.json()
    structured_commits = [
        structure_data("GitHub", "commit", commit)
        for commit in commits
    ]

    return jsonify(structured_commits)

if __name__ == '__main__':
    app.run(debug=True, port=5000, ssl_context=('cert.pem', 'key.pem'))
