import json
import os
import hashlib
import hmac
import time
import psycopg2

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def make_token(admin_id: int, username: str) -> str:
    secret = os.environ.get('ADMIN_SECRET', 'ostec-secret-key-2024')
    payload = f"{admin_id}:{username}:{int(time.time() // 3600)}"
    sig = hmac.new(secret.encode(), payload.encode(), hashlib.sha256).hexdigest()
    return f"{payload}:{sig}"

def verify_token(token: str) -> dict | None:
    secret = os.environ.get('ADMIN_SECRET', 'ostec-secret-key-2024')
    try:
        parts = token.split(':')
        if len(parts) != 4:
            return None
        admin_id, username, ts, sig = parts
        payload = f"{admin_id}:{username}:{ts}"
        expected = hmac.new(secret.encode(), payload.encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(sig, expected):
            return None
        if abs(int(time.time() // 3600) - int(ts)) > 24:
            return None
        return {'admin_id': int(admin_id), 'username': username}
    except Exception:
        return None

def handler(event: dict, context) -> dict:
    """Авторизация администратора — вход и проверка токена"""
    cors = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'}
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {**cors, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'}, 'body': ''}

    method = event.get('httpMethod', 'GET')

    if method == 'GET':
        token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
        data = verify_token(token)
        if data:
            return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True, 'username': data['username']})}
        return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'ok': False, 'error': 'Unauthorized'})}

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        username = body.get('username', '').strip()
        password = body.get('password', '')

        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT id, username, password_hash FROM admins WHERE username = %s", (username,))
        row = cur.fetchone()
        conn.close()

        if not row:
            return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'ok': False, 'error': 'Неверный логин или пароль'})}

        import bcrypt
        if not bcrypt.checkpw(password.encode(), row[2].encode()):
            return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'ok': False, 'error': 'Неверный логин или пароль'})}

        token = make_token(row[0], row[1])
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True, 'token': token, 'username': row[1]})}

    return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}
