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

def auth_check(event):
    token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
    return verify_token(token)

def handler(event: dict, context) -> dict:
    """CRUD для товаров каталога — получение, добавление, редактирование, удаление"""
    cors = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'}
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {**cors, 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'}, 'body': ''}

    method = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters') or {}
    product_id = params.get('id')

    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        if product_id:
            cur.execute("SELECT id, name, category, description, specs, image_url, is_active, created_at FROM products WHERE id = %s", (product_id,))
            row = cur.fetchone()
            conn.close()
            if not row:
                return {'statusCode': 404, 'headers': cors, 'body': json.dumps({'error': 'Not found'})}
            cols = ['id', 'name', 'category', 'description', 'specs', 'image_url', 'is_active', 'created_at']
            return {'statusCode': 200, 'headers': cors, 'body': json.dumps(dict(zip(cols, [str(v) if hasattr(v, 'isoformat') else v for v in row])))}
        cur.execute("SELECT id, name, category, description, specs, image_url, is_active, created_at FROM products ORDER BY created_at DESC")
        rows = cur.fetchall()
        conn.close()
        cols = ['id', 'name', 'category', 'description', 'specs', 'image_url', 'is_active', 'created_at']
        result = [dict(zip(cols, [str(v) if hasattr(v, 'isoformat') else v for v in row])) for row in rows]
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps(result)}

    if not auth_check(event):
        return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'error': 'Unauthorized'})}

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO products (name, category, description, specs, image_url) VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (body.get('name'), body.get('category'), body.get('description'), body.get('specs'), body.get('image_url'))
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {'statusCode': 201, 'headers': cors, 'body': json.dumps({'ok': True, 'id': new_id})}

    if method == 'PUT':
        body = json.loads(event.get('body') or '{}')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "UPDATE products SET name=%s, category=%s, description=%s, specs=%s, image_url=%s, is_active=%s, updated_at=NOW() WHERE id=%s",
            (body.get('name'), body.get('category'), body.get('description'), body.get('specs'), body.get('image_url'), body.get('is_active', True), product_id)
        )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

    if method == 'DELETE':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("DELETE FROM products WHERE id = %s", (product_id,))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}
