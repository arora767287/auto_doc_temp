from flask import Flask, redirect, request, session, url_for
import requests
import sqlite3
import os
import time
import zipfile
import json

app = Flask(__name__)
app.secret_key = 'YOUR_SECRET_KEY'

# Google OAuth Configuration
CLIENT_ID = "491890770418-mdun9hqs26bpptnpaabc1t7n9htjftob.apps.googleusercontent.com"
CLIENT_SECRET = "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"
REDIRECT_URI = 'https://127.0.0.1:5000/google_callback'
SCOPE = 'https://www.googleapis.com/auth/dataportability.myactivity.search'

# Database initialization
DB_PATH = 'user_search_history.db'


def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS search_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            header TEXT,
            title TEXT,
            time TEXT,
            products TEXT,
            activityControls TEXT
        )
    ''')
    conn.commit()
    conn.close()


@app.route('/')
def index():
    return '<a href="/authorize">Sign in with Google</a>'


@app.route('/authorize')
def authorize():
    auth_url = (
        'https://accounts.google.com/o/oauth2/v2/auth'
        f'?client_id={CLIENT_ID}'
        f'&redirect_uri={REDIRECT_URI}'
        f'&response_type=code'
        f'&scope={SCOPE}'
        f'&access_type=offline'
        f'&prompt=consent'
    )
    return redirect(auth_url)


@app.route('/callback')
def callback():
    code = request.args.get('code')
    token_url = 'https://oauth2.googleapis.com/token'
    token_data = {
        'code': code,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'redirect_uri': REDIRECT_URI,
        'grant_type': 'authorization_code'
    }
    token_response = requests.post(token_url, data=token_data)
    token_info = token_response.json()
    session['access_token'] = token_info.get('access_token')
    session['refresh_token'] = token_info.get('refresh_token')
    return redirect(url_for('initiate_export'))


@app.route('/initiate_export')
def initiate_export():
    access_token = session.get('access_token')
    if not access_token:
        return redirect(url_for('authorize'))

    initiate_url = 'https://dataportability.googleapis.com/v1/archiveJobs:initialize'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    body = {
        'resourceGroup': ['myactivity.search']
    }
    response = requests.post(initiate_url, headers=headers, json=body)
    job_info = response.json()
    session['job_id'] = job_info.get('jobId')
    return redirect(url_for('check_status'))


@app.route('/check_status')
def check_status():
    access_token = session.get('access_token')
    job_id = session.get('job_id')
    if not access_token or not job_id:
        return redirect(url_for('authorize'))

    status_url = f'https://dataportability.googleapis.com/v1/archiveJobs/{job_id}'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    response = requests.get(status_url, headers=headers)
    job_status = response.json()
    state = job_status.get('state')

    if state == 'COMPLETE':
        session['download_url'] = job_status.get('archiveDownloadUrl')
        return redirect(url_for('download_data'))
    elif state == 'FAILED':
        return 'Data export job failed.'
    else:
        time.sleep(60)  # Wait for a minute before checking again
        return redirect(url_for('check_status'))


@app.route('/download_data')
def download_data():
    download_url = session.get('download_url')
    if not download_url:
        return redirect(url_for('authorize'))

    response = requests.get(download_url)
    with open('search_activity.zip', 'wb') as file:
        file.write(response.content)

    with zipfile.ZipFile('search_activity.zip', 'r') as zip_ref:
        zip_ref.extractall('search_activity')

    with open('search_activity/MyActivity.json', 'r') as json_file:
        search_data = json.load(json_file)

    store_data_in_db(search_data)
    return 'Data downloaded and stored successfully.'


def store_data_in_db(search_data):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    for activity in search_data.get('activities', []):
        cursor.execute('''
            INSERT INTO search_history (header, title, time, products, activityControls)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            activity.get('header'),
            activity.get('title'),
            activity.get('time'),
            ', '.join(activity.get('products', [])),
            ', '.join(activity.get('activityControls', []))
        ))

    conn.commit()
    conn.close()


@app.route('/search_history', methods=['GET'])
def search_history():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM search_history')
    rows = cursor.fetchall()
    conn.close()
    return {'search_history': rows}


if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000, ssl_context=('cert.pem', 'key.pem'))