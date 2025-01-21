from flask import Flask, request, jsonify
from cryptography.fernet import Fernet
import requests

app = Flask(__name__)

# Generate and securely store this key in an environment variable
encryption_key = Fernet.generate_key()
cipher_suite = Fernet(encryption_key)

# In-memory storage for demonstration (use a secure database in production)
user_tokens = {}

@app.route('/connect', methods=['POST'])
def connect_user():
    """
    Endpoint to save a user's TestRail token securely.
    Expects JSON payload: { "subdomain": "company", "api_token": "your_api_token" }
    """
    data = request.json
    subdomain = data.get('subdomain')
    api_token = data.get('api_token')

    if not subdomain or not api_token:
        return jsonify({"error": "Subdomain and API token are required"}), 400

    # Encrypt and store the token
    encrypted_token = cipher_suite.encrypt(api_token.encode())
    user_tokens[subdomain] = encrypted_token

    return jsonify({"message": "Connected successfully!"}), 200


@app.route('/get_tests', methods=['GET'])
def get_tests():
    """
    Fetch test cases from TestRail using the stored token.
    Query params: subdomain (required), project_id (required)
    """
    subdomain = request.args.get('subdomain')
    project_id = request.args.get('project_id')

    if not subdomain or not project_id:
        return jsonify({"error": "Subdomain and project_id are required"}), 400

    # Retrieve and decrypt the token
    encrypted_token = user_tokens.get(subdomain)
    if not encrypted_token:
        return jsonify({"error": "No token found for this subdomain"}), 404

    api_token = cipher_suite.decrypt(encrypted_token).decode()
    url = f"https://{subdomain}.testrail.io/index.php?/api/v2/get_cases/{project_id}"
    headers = {"Content-Type": "application/json"}

    # Make the API request
    response = requests.get(url, auth=(api_token, ""), headers=headers)

    if response.status_code != 200:
        return jsonify({"error": f"Failed to fetch tests: {response.text}"}), response.status_code

    return jsonify(response.json()), 200


if __name__ == '__main__':
    app.run(debug=True)
