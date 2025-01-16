import psycopg2

def store_token(platform: str, user_id: str, token_data: dict):
    """Stores OAuth2 tokens in the database."""
    conn = psycopg2.connect("your-database-connection-string")
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO user_tokens (user_id, platform, access_token, refresh_token, expires_at)
        VALUES (%s, %s, %s, %s, %s)
        ON CONFLICT (user_id, platform) DO UPDATE 
        SET access_token = EXCLUDED.access_token, 
            refresh_token = EXCLUDED.refresh_token, 
            expires_at = EXCLUDED.expires_at
    """, (user_id, platform, token_data["access_token"], token_data.get("refresh_token"), token_data.get("expires_at")))
    conn.commit()
    cursor.close()
    conn.close()

def get_user_tokens(user_id: str, platform: str):
    """Fetches OAuth2 tokens for a user and platform."""
    conn = psycopg2.connect("your-database-connection-string")
    cursor = conn.cursor()
    cursor.execute("""
        SELECT access_token FROM user_tokens WHERE user_id = %s AND platform = %s
    """, (user_id, platform))
    token = cursor.fetchone()
    conn.close()
    if token:
        return {"access_token": token[0]}
    raise ValueError(f"No token found for user {user_id} and platform {platform}")
