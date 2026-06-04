import json
import os
import hmac
import hashlib
import time
import psycopg2

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

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
    """Управление заказами — список, смена статуса"""
    cors = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'}
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {**cors, 'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'}, 'body': ''}

    method = event.get('httpMethod', 'GET')
    token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')

    if not verify_token(token):
        return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'error': 'Unauthorized'})}

    params = event.get('queryStringParameters') or {}
    order_id = params.get('id')

    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT id, name, company, email, phone, product, message, status, created_at FROM orders ORDER BY created_at DESC")
        rows = cur.fetchall()
        conn.close()
        cols = ['id', 'name', 'company', 'email', 'phone', 'product', 'message', 'status', 'created_at']
        result = [dict(zip(cols, [str(v) if hasattr(v, 'isoformat') else v for v in row])) for row in rows]
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps(result)}

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO orders (name, company, email, phone, product, message) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
            (body.get('name'), body.get('company'), body.get('email'), body.get('phone'), body.get('product'), body.get('message'))
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {'statusCode': 201, 'headers': cors, 'body': json.dumps({'ok': True, 'id': new_id})}

    if method == 'PUT' and order_id:
        body = json.loads(event.get('body') or '{}')
        new_status = body.get('status')
        allowed = ['new', 'in_progress', 'done', 'cancelled']
        if new_status not in allowed:
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Invalid status'})}
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("UPDATE orders SET status=%s, updated_at=NOW() WHERE id=%s", (new_status, order_id))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}
