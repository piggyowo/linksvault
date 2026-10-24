#!/usr/bin/env python3
"""Deploy linkvault with the Cloudflare API (no wrangler needed).

What it does, in order:
  1. Create the D1 database (or reuse it if it already exists)
  2. Create the bookmarks table + indexes
  3. Upload worker.js and bind it to the D1 database (binding name: DB)
  4. Set the ADMIN secret (your admin password)
  5. Enable the *.workers.dev route (API uploads leave it disabled by default)
  6. Optionally bind a custom domain

Environment variables:
  CF_API_TOKEN      required. API token with: Workers Scripts (Edit) + D1 (Edit)
  CF_ACCOUNT_ID     required. Your Cloudflare account ID
                    (Dashboard -> Account -> Account ID, on the right sidebar)
  LINKVAULT_ADMIN   optional. Admin password. If unset, a random 12-char
                    password is generated and printed at the end.
  LINKVAULT_DOMAIN  optional. Custom domain to bind, e.g. links.example.com
                    (the domain must already be active on Cloudflare; the
                    script does NOT change nameservers for you)

Usage:
  export CF_API_TOKEN='...' CF_ACCOUNT_ID='...'
  python3 deploy.py
"""
import os, sys, json, secrets, string, urllib.request, urllib.error

TOKEN = os.environ.get('CF_API_TOKEN', '').strip()
AID = os.environ.get('CF_ACCOUNT_ID', '').strip()
if not TOKEN or not AID:
    print('Missing CF_API_TOKEN or CF_ACCOUNT_ID. See the docstring above.')
    sys.exit(1)

BASE = f'https://api.cloudflare.com/client/v4/accounts/{AID}'
SCRIPT = 'linkvault'
DB_NAME = 'linkvault'
CUSTOM_DOMAIN = os.environ.get('LINKVAULT_DOMAIN', '').strip()
HERE = os.path.dirname(os.path.abspath(__file__))

SCHEMA = [
    """CREATE TABLE IF NOT EXISTS bookmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      note TEXT DEFAULT '',
      cat TEXT DEFAULT '',
      tags TEXT DEFAULT '',
      pinned INTEGER DEFAULT 0,
      og_image TEXT DEFAULT '',
      og_desc TEXT DEFAULT '',
      created_at INTEGER,
      updated_at INTEGER
    )""",
    "CREATE INDEX IF NOT EXISTS idx_bookmarks_url ON bookmarks(url)",
    "CREATE INDEX IF NOT EXISTS idx_bookmarks_cat ON bookmarks(cat)",
]

def req(method, path, data=None):
    h = {'Authorization': 'Bearer ' + TOKEN}
    body = None
    if data is not None:
        body = json.dumps(data).encode()
        h['Content-Type'] = 'application/json'
    r = urllib.request.Request(BASE + path, data=body, headers=h, method=method)
    try:
        with urllib.request.urlopen(r, timeout=60) as resp:
            return resp.status, json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        try:
            return e.code, json.loads(e.read().decode() or '{}')
        except Exception:
            return e.code, {}

# 1. D1 database (find or create)
code, dbs = req('GET', '/d1/database')
db = next((d for d in dbs.get('result', []) if d['name'] == DB_NAME), None)
if db:
    db_id = db['uuid']
    print('D1 exists:', db_id)
else:
    code, out = req('POST', '/d1/database', {'name': DB_NAME})
    assert code == 200, out
    db_id = out['result']['uuid']
    print('D1 created:', db_id)

# 2. schema
for sql in SCHEMA:
    code, out = req('POST', f'/d1/database/{db_id}/query', {'sql': sql})
    ok = code == 200 and out.get('success')
    print('schema:', 'ok' if ok else f'HTTP {code} {json.dumps(out)[:200]}')

# 3. upload worker with D1 binding (multipart)
with open(os.path.join(HERE, 'worker.js'), 'rb') as f:
    js = f.read()
boundary = '----linkvault' + secrets.token_hex(8)
meta = json.dumps({
    'main_module': 'worker.js',
    'bindings': [{'type': 'd1', 'name': 'DB', 'id': db_id}],
}).encode()
parts = []
parts.append(b'--' + boundary.encode() + b'\r\nContent-Disposition: form-data; name="metadata"\r\nContent-Type: application/json\r\n\r\n' + meta + b'\r\n')
parts.append(b'--' + boundary.encode() + b'\r\nContent-Disposition: form-data; name="worker.js"; filename="worker.js"\r\nContent-Type: application/javascript+module\r\n\r\n' + js + b'\r\n')
parts.append(b'--' + boundary.encode() + b'--\r\n')
body = b''.join(parts)
h = {'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'multipart/form-data; boundary=' + boundary}
r = urllib.request.Request(BASE + f'/workers/scripts/{SCRIPT}', data=body, headers=h, method='PUT')
try:
    with urllib.request.urlopen(r, timeout=120) as resp:
        out = json.loads(resp.read().decode())
        print('worker upload: HTTP', resp.status, 'id:', out.get('result', {}).get('id'))
except urllib.error.HTTPError as e:
    print('worker upload FAILED:', e.code, e.read().decode()[:500])
    sys.exit(1)

# 4. ADMIN secret
password = os.environ.get('LINKVAULT_ADMIN', '').strip()
if not password:
    alphabet = string.ascii_letters + string.digits
    password = ''.join(secrets.choice(alphabet) for _ in range(12))
code, out = req('PUT', f'/workers/scripts/{SCRIPT}/secrets',
                {'name': 'ADMIN', 'text': password, 'type': 'secret_text'})
print('ADMIN secret:', 'ok' if code == 200 else f'HTTP {code} {json.dumps(out)[:200]}')

# 5. CRITICAL: enable workers.dev route (otherwise *.workers.dev shows
#    Cloudflare's "There is nothing here yet" placeholder page)
code, out = req('POST', f'/workers/scripts/{SCRIPT}/subdomain', {'enabled': True})
print('workers.dev route enable:', 'ok' if code == 200 and out.get('success') else f'HTTP {code} {json.dumps(out)[:200]}')

# 6. Bind custom domain (optional)
if CUSTOM_DOMAIN:
    code, out = req('PUT', '/workers/domains',
                    {'hostname': CUSTOM_DOMAIN, 'service': SCRIPT, 'environment': 'production'})
    print('custom domain bind:', 'ok' if code == 200 and out.get('success', True) else f'HTTP {code} {json.dumps(out)[:200]}')
    print('URL (custom domain): https://' + CUSTOM_DOMAIN)

# 7. Print workers.dev URL + admin password
code, out = req('GET', '/workers/subdomain')
sub = out.get('result', {}).get('subdomain', '')
print('URL (workers.dev): https://' + SCRIPT + '.' + sub + '.workers.dev')
print('ADMIN_PASSWORD: ' + password)
