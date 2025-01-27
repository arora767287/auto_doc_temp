from flask import Flask, request, jsonify
from flask_oauthlib.provider import OAuth2Provider

app = Flask(__name__)
app.secret_key = 'demo_secret_key'
oauth = OAuth2Provider(app)

# Mock database
clients = {
    "client_id": {
        "client_secret": "client_secret",
        "scopes": ["read_logs", "write_logs"]
    }
}
tokens = {}
logs = [
    {"timestamp": "2025-01-21 09:30:45", "test_id": "TC001", "status": "PASS", "description": "Verify user login"},
    {"timestamp": "2025-01-21 09:31:50", "test_id": "TC002", "status": "FAIL", "description": "Check invalid login"},
]

@oauth.clientgetter
def load_client(client_id):
    return clients.get(client_id)

@oauth.tokengetter
def load_token(access_token=None, refresh_token=None):
    return tokens.get(access_token)

@oauth.tokensetter
def save_token(token, request):
    tokens[token["access_token"]] = token

@app.route('/get_logs', methods=['GET'])
@oauth.require_oauth("read_logs")
def get_logs():
    return jsonify(logs)

@app.route('/write_log', methods=['POST'])
@oauth.require_oauth("write_logs")
def write_log():
    data = request.json
    logs.append(data)
    return jsonify({"message": "Log added!"}), 201

if __name__ == "__main__":
    app.run(port=5000, debug=True)
