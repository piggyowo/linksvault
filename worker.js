// linkvault worker: 网站收藏 (Worker + D1)
// 路由: / -> 应用页（公开只读，未登录角色 public）; /login -> 登录页;
//       /api/login, /api/logout, /api/items, /api/cats,
//       /api/import, /api/export.html, /api/export.json

const APP_NAME = 'linkvault';
// 部署前唯一要改的一处：改成你自己的收藏夹地址（机器人回复里用；不接机器人可以不管）
const SITE_URL = 'https://links.你的域名';
const ICON_B64 = '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';

async function sha256hex(s) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(d)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function getCookie(req, name) {
  const c = req.headers.get('Cookie') || '';
  const m = c.split(';').map(x => x.trim()).find(x => x.startsWith(name + '='));
  return m ? decodeURIComponent(m.slice(name.length + 1)) : '';
}

async function roleOf(req, env) {
  const token = getCookie(req, 'lv_auth');
  if (!token) return null;
  const admin = env.ADMIN || '';
  const guest = env.GUEST || '';
  if (admin && token === await sha256hex('linkvault|admin|' + admin)) return 'admin';
  if (guest && token === await sha256hex('linkvault|guest|' + guest)) return 'guest';
  return null;
}

function unauthorized() {
  return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
}
function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
}

// ---- URL 归一化（去重用）：协议/主机由 URL 解析器统一大小写，去掉锚点和末尾斜杠 ----
function normalizeUrl(u) {
  const s = String(u || '').trim();
  try {
    const x = new URL(s);
    x.hash = '';
    let out = x.toString();
    if (x.pathname === '/' && !x.search) out = out.replace(/\/$/, '');
    else out = out.replace(/\/$/, '');
    return out.toLowerCase().startsWith(x.protocol) ? out : out;
  } catch (e) {
    return s.replace(/\/$/, '').toLowerCase();
  }
}
function isHttpUrl(u) {
  const s = String(u || '').trim().toLowerCase();
  return s.startsWith('http://') || s.startsWith('https://');
}
// 用户常只填 www.example.com / example.com 不带协议：自动补 https://。
// 带其它协议（ftp:、javascript: 等）或根本解析不出主机名的，返回 '' 表示无效。
function fixUrl(u) {
  let s = String(u || '').trim();
  if (!s || /\s/.test(s)) return '';
  if (/^[a-z][a-z0-9+.-]*:/i.test(s) && !/^https?:/i.test(s)) {
    const after = s.slice(s.indexOf(':') + 1);
    if (!/^\d+(\/|$|\?|#)/.test(after)) return ''; // 不是 host:port 形式 → 别的协议，拒
  }
  if (s.startsWith('//')) s = 'https:' + s;
  else if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
  try {
    const x = new URL(s);
    if (!x.hostname) return '';
    return s;
  } catch (e) { return ''; }
}
function hostOf(u) {
  try { return new URL(String(u || '').trim()).hostname || ''; } catch (e) { return ''; }
}

// ---- Open Graph 预览抓取（Telegram 式链接预览）：服务端抓 og/twitter/meta 信息 ----
// 返回 { title, desc, image }；抓不到任何有用信息或出错时返回 null，调用方必须容忍失败。
const PREVIEW_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

function decodeEntities(s) {
  return String(s == null ? '' : s)
    .replace(/&#x([0-9a-fA-F]+);/g, (m, h) => { try { return String.fromCodePoint(parseInt(h, 16)); } catch (e) { return m; } })
    .replace(/&#(\d+);/g, (m, d) => { try { return String.fromCodePoint(parseInt(d, 10)); } catch (e) { return m; } })
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

// 在 html 里按 key 找 <meta property|name="key" content="...">，属性顺序/单双引号都兼容
function metaContent(html, keys) {
  const tagRe = /<meta\b[^>]*>/gi;
  let tag;
  while ((tag = tagRe.exec(html)) !== null) {
    const t = tag[0];
    const prop = t.match(/(?:property|name)\s*=\s*["']([^"']+)["']/i);
    if (!prop) continue;
    if (keys.indexOf(prop[1].toLowerCase()) < 0) continue;
    const c = t.match(/content\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
    if (c) return decodeEntities(c[1] !== undefined ? c[1] : c[2]).trim();
  }
  return '';
}

async function fetchPreviewOnce(targetUrl, ua) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const resp = await fetch(targetUrl, {
      headers: { 'User-Agent': ua, 'Accept': 'text/html' },
      redirect: 'follow',
      signal: ctrl.signal,
    });
    if (!resp || !resp.ok) return null;
    const ct = (resp.headers.get('Content-Type') || '').toLowerCase();
    if (ct && ct.indexOf('text/html') < 0 && ct.indexOf('application/xhtml') < 0) return null;
    const finalUrl = resp.url || targetUrl;
    let html = await resp.text();
    if (html.length > 300000) html = html.slice(0, 300000);
    let title = metaContent(html, ['og:title']);
    if (!title) {
      const tm = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      if (tm) title = decodeEntities(tm[1]).trim();
    }
    const desc = metaContent(html, ['og:description', 'twitter:description', 'description']);
    let image = metaContent(html, ['og:image', 'twitter:image']);
    if (image) {
      try { image = new URL(image, finalUrl).toString(); } catch (e) { image = ''; }
    }
    const out = {
      title: title.replace(/\s+/g, ' ').trim(),
      desc: desc.replace(/\s+/g, ' ').trim().slice(0, 300),
      image: image || '',
    };
    if (!out.title && !out.desc && !out.image) return null;
    return out;
  } catch (e) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// 先用浏览器身份抓；拿不到图时换 Telegram 爬虫身份再试一次（不少站点只给爬虫放行 og 图）
async function fetchPreview(targetUrl) {
  const out = await fetchPreviewOnce(targetUrl, PREVIEW_UA);
  if (!out || !out.image) {
    const alt = await fetchPreviewOnce(targetUrl, 'TelegramBot (like TwitterBot)');
    if (alt && (alt.image || !out)) return alt;
  }
  return out;
}

const ROW_COLS = 'id, title, url, note, cat, tags, pinned, og_image, og_desc, created_at, updated_at';
function escHtml(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ---- 登录防爆破（尽力而为：按 isolate 的内存计数，无需新增绑定） ----
// 同一 IP 5 分钟内输错 5 次 → 锁定 10 分钟。Workers 多 isolate 部署下是近似限流，
// 不是铁板；配合尽量长的密码使用。
const _loginFails = new Map(); // ip -> { fails, windowStart, blockedUntil }
const LOGIN_WINDOW_MS = 5 * 60 * 1000;
const LOGIN_MAX_FAILS = 5;
const LOGIN_BLOCK_MS = 10 * 60 * 1000;
function _clientIp(req) {
  const cf = req.headers.get('CF-Connecting-IP');
  if (cf) return cf.trim();
  const xff = req.headers.get('X-Forwarded-For');
  if (xff) return xff.split(',')[0].trim();
  return 'unknown';
}
function _loginBlocked(ip) {
  const now = Date.now();
  const e = _loginFails.get(ip);
  if (!e) return false;
  if (e.blockedUntil && e.blockedUntil > now) return true;
  if (now - e.windowStart > LOGIN_WINDOW_MS) { _loginFails.delete(ip); return false; }
  return false;
}
function _loginFail(ip) {
  const now = Date.now();
  let e = _loginFails.get(ip);
  if (!e || now - e.windowStart > LOGIN_WINDOW_MS) e = { fails: 0, windowStart: now, blockedUntil: 0 };
  e.fails += 1;
  if (e.fails >= LOGIN_MAX_FAILS) { e.blockedUntil = now + LOGIN_BLOCK_MS; e.fails = 0; }
  _loginFails.set(ip, e);
  if (_loginFails.size > 5000) _loginFails.delete(_loginFails.keys().next().value);
}
function _loginOk(ip) { _loginFails.delete(ip); }

const GLOBE_SVG = '<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14.5 14.5 0 0 1 0 18"/><path d="M12 3a14.5 14.5 0 0 0 0 18"/></svg>';

const LOGIN_HTML = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/>
<meta name="robots" content="noindex,nofollow"/>
<title>网站收藏 · LinkVault</title><link rel="icon" type="image/webp" href="/icon.webp"/>
<style>
*{box-sizing:border-box;margin:0}
body{min-height:100vh;background:linear-gradient(180deg,#fdf6ec 0%,#faf3e7 100%);font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","PingFang SC","Microsoft YaHei",sans-serif;display:flex;align-items:center;justify-content:center;padding:24px;color:#3d2712;-webkit-tap-highlight-color:transparent}
.login{width:100%;max-width:380px;text-align:center;animation:rise .6s cubic-bezier(.22,1,.36,1) backwards}
@keyframes rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
.icon{width:78px;height:78px;border-radius:22px;overflow:hidden;margin:0 auto 24px;box-shadow:0 14px 34px rgba(0,0,0,.18)}
.icon img{width:100%;height:100%;object-fit:cover;display:block}
h1{font-size:36px;font-weight:800;letter-spacing:-.8px;margin-bottom:8px}
.sub{font-size:15px;color:#a08b74;margin-bottom:34px}
.card{background:#fffdf8;border-radius:22px;box-shadow:0 10px 44px rgba(150,90,20,.10);padding:28px 24px;text-align:left}
.card label{font-size:13px;font-weight:600;color:#96754e;display:block;margin-bottom:8px}
.card input{width:100%;background:#f8ecd9;border:1.5px solid transparent;border-radius:14px;padding:14px 16px;font-size:17px;outline:none;color:#3d2712;transition:border-color .2s,box-shadow .2s,background .2s;margin-bottom:16px}
.card input:focus{border-color:#e07f3e;box-shadow:0 0 0 4px rgba(224,127,62,.15);background:#fff}
.card button{width:100%;border:none;border-radius:999px;background:linear-gradient(120deg,#f0a04e,#e07f3e);color:#fff;font-size:17px;font-weight:700;padding:15px;cursor:pointer;transition:transform .15s,background .2s}
.card button:hover{background:#e8893f}
.card button:active{transform:scale(.97)}
.err{color:#ff3b30;font-size:14px;font-weight:600;min-height:20px;margin:-6px 0 10px;text-align:center}
.err.shake{animation:shake .4s}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}50%{transform:translateX(8px)}75%{transform:translateX(-4px)}}
.foot{margin-top:26px;font-size:13px;color:#b09468}
.foot b{color:#43260d}
</style></head><body>
<div class="login">
<div class="icon"><img src="/icon.webp" alt=""/></div>
<h1>网站收藏</h1>
<div class="sub">LinkVault · 安全 · 私密 · 随时都在</div>
<div class="card">
<label>访问密码</label>
<div class="err" id="err"></div>
<input id="pw" type="password" placeholder="请输入密码" autocomplete="current-password"/>
<button id="go">进入</button>
</div>
<div class="foot">忘记密码？找我帮你重置</div>
</div>
<script>
var pw=document.getElementById('pw'),err=document.getElementById('err');
function go(){err.textContent='';err.classList.remove('shake');
fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pw.value})})
.then(function(r){return r.json().then(function(j){return{r:r,j:j};});})
.then(function(x){if(x.r.ok&&x.j.ok){location.href='/';}else{err.textContent=x.j.blocked?'试太多次了，10 分钟后再试':'密码不对，再想想';err.classList.add('shake');pw.select();pw.focus();}});}
document.getElementById('go').onclick=go;
pw.addEventListener('keydown',function(e){if(e.key==='Enter')go();});
pw.focus();
</script></body></html>
`.replace('__GLOBE__', GLOBE_SVG);

const APP_HTML = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/>
<meta name="robots" content="noindex,nofollow"/>
<title>网站收藏 · LinkVault</title><link rel="icon" type="image/webp" href="/icon.webp"/>
<style>
*{box-sizing:border-box;margin:0}
:root{--bg:#faf3e7;--surface:#fffdf8;--text:#3d2712;--muted:#8a7663;--accent:#e07f3e;--border:rgba(190,110,30,.15);--ease:cubic-bezier(.22,1,.36,1)}
body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","PingFang SC","Microsoft YaHei",sans-serif;min-height:100vh;-webkit-tap-highlight-color:transparent}
.nav{position:sticky;top:0;z-index:20;-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);background:rgba(250,243,231,.86);border-bottom:1px solid var(--border)}
.nav-in{max-width:640px;margin:0 auto;padding:13px 12px;display:flex;align-items:center;justify-content:space-between}
.nav-title{font-size:17px;font-weight:700;color:#43260d;letter-spacing:-.2px;display:flex;align-items:center;gap:7px}
.brand-icon{width:26px;height:26px;border-radius:7px;object-fit:cover;display:block}
.nav-out{border:1px solid rgba(190,110,30,.28);background:linear-gradient(120deg,#fbe7c6,#f6bd75);color:#6b3d12;font-size:13.5px;font-weight:700;cursor:pointer;padding:7px 16px;border-radius:999px;box-shadow:0 4px 14px rgba(238,154,78,.35)}
.main{max-width:640px;margin:0 auto;padding:16px 12px 110px}
.hero{position:relative;overflow:hidden;border-radius:24px;padding:17px 20px 34px;background:linear-gradient(125deg,#fbe7c6 0%,#f6bd75 55%,#ee9a4e 100%);box-shadow:0 12px 28px rgba(238,154,78,.32)}
.hpill{display:inline-block;background:rgba(90,50,10,.16);color:#6b3d12;font-size:11px;font-weight:700;border-radius:999px;padding:3px 9px}
.hero h1{font-size:30px;font-weight:800;letter-spacing:-.8px;color:#43260d;margin:8px 0 3px}
.hero p{color:rgba(67,38,13,.78);font-size:13px;font-weight:600;max-width:230px;line-height:1.55}
.capy{position:absolute;right:16px;bottom:10px;width:78px;height:78px;border-radius:50%;object-fit:cover;border:3.5px solid rgba(255,255,255,.75);box-shadow:0 8px 20px rgba(90,50,10,.28)}
.toolbar{display:flex;gap:8px;flex-wrap:wrap;margin:0 2px 12px}
.tbtn{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border);background:var(--surface);color:#6b4a26;font-size:14px;font-weight:600;border-radius:999px;padding:8px 16px;cursor:pointer;text-decoration:none;transition:all .2s var(--ease)}
.tbtn:active{transform:scale(.96)}
.tbtn.primary{background:linear-gradient(120deg,#f0a04e,#e07f3e);border-color:transparent;color:#fff}
.search{position:relative;z-index:5;display:flex;align-items:center;gap:9px;background:#fffaf1;border:1px solid rgba(190,110,30,.22);border-radius:999px;padding:12px 18px;color:#e07f3e;margin:-16px 6px 0;box-shadow:0 10px 26px rgba(190,110,30,.18);transition:box-shadow .25s,border-color .25s}
.search:focus-within{border-color:rgba(224,127,62,.55);box-shadow:0 10px 26px rgba(190,110,30,.18),0 0 0 4px rgba(224,127,62,.15)}
.search input{flex:1;border:none;background:none;outline:none;font-size:16px;color:var(--text);min-width:0}
.search input::placeholder{color:#bfa07a}
.chips{display:flex;gap:8px;overflow-x:auto;padding:14px 2px 12px;scrollbar-width:none}
.chips::-webkit-scrollbar{display:none}
.chip{flex:none;border:1px solid var(--border);background:var(--surface);color:#96754e;font-size:14px;font-weight:600;border-radius:999px;padding:8px 17px;cursor:pointer;transition:all .25s var(--ease)}
.chip.on{background:linear-gradient(120deg,#8a5a24,#6b3d12);border-color:transparent;color:#fff;transform:scale(1.06)}
.count{font-size:13px;color:var(--muted);font-weight:600;margin:2px 2px 12px}
.list{display:flex;flex-direction:column;gap:12px}
.card{background:var(--surface);border:1px solid var(--border);border-radius:19px;padding:12px;display:flex;gap:13px;height:134px;overflow:hidden;align-items:flex-start;box-shadow:0 3px 16px rgba(150,90,20,.08);animation:rise .5s var(--ease) backwards;transition:transform .18s var(--ease),opacity .22s}
@keyframes rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.card:active{transform:scale(.99)}
.card.leaving{opacity:0;transform:translateX(60px)}
.thumb{width:110px;height:110px;border-radius:14px;object-fit:cover;flex:none;cursor:pointer;background:#f3e3cb;display:block}
.thumb.ph{display:flex;align-items:center;justify-content:center;font-size:38px;font-weight:800;color:#a4713a;background:linear-gradient(135deg,#fbe7c6,#f6bd75)}
.cbody{flex:1;min-width:0;height:110px;overflow:hidden;display:flex;flex-direction:column;padding:2px 2px 0 0}
.card:has(.actions){height:auto;min-height:134px}
.cbody:has(.actions) .desc{-webkit-line-clamp:1}
.hostrow{display:flex;align-items:center;gap:7px;margin-bottom:7px;cursor:pointer;min-width:0}
.fav{width:18px;height:18px;flex:none;border-radius:5px;background:var(--bg);object-fit:contain}
.host{font-size:13px;color:#b09468;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.name{font-size:17px;font-weight:700;letter-spacing:-.2px;line-height:1.35;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;cursor:pointer}
.pin{font-size:13px;margin-right:5px}
.desc{font-size:14px;color:var(--muted);margin-top:5px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;cursor:pointer}
.pillrow{margin-top:auto;padding-top:9px}
.actions{display:flex;justify-content:flex-end;gap:6px;margin-top:auto;padding-top:8px}
.tagpill{display:inline-block;background:rgba(224,127,62,.13);color:#c26a1d;font-weight:700;font-size:12px;border-radius:7px;padding:2px 8px;margin-right:6px}
.graypill{display:inline-block;background:rgba(150,100,40,.10);color:#96754e;font-weight:600;font-size:12px;border-radius:7px;padding:2px 8px;margin-right:6px}
.iconbtn{width:34px;height:34px;flex:none;border-radius:50%;border:none;background:#faf0dd;color:#96754e;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .15s,background .2s}
.iconbtn:active{transform:scale(.85)}
.iconbtn.del{color:#ff3b30}
.empty{text-align:center;padding:56px 20px;animation:rise .5s var(--ease) backwards}
.empty .e-icon{width:64px;height:64px;border-radius:18px;background:#f3e3cb;color:#b07f3f;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.empty .e-t{font-size:17px;font-weight:700;margin-bottom:6px}
.empty .e-s{font-size:14px;color:var(--muted)}
.shimmer{background:linear-gradient(100deg,#f1e3cc 40%,#faf0dd 50%,#f1e3cc 60%);background-size:200% 100%;animation:sh 1.4s infinite;border-radius:18px;height:134px;border:1px solid var(--border)}
@keyframes sh{to{background-position:-200% 0}}
.fab{position:fixed;right:22px;bottom:26px;width:60px;height:60px;border-radius:50%;border:none;background:linear-gradient(135deg,#f0a04e,#e07f3e);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 28px rgba(224,127,62,.42);transition:transform .2s cubic-bezier(.34,1.56,.64,1),background .2s;z-index:30}
.fab:hover{background:#e8893f}
.fab:active{transform:scale(.88) rotate(90deg)}
.sheet-wrap{position:fixed;inset:0;z-index:50;pointer-events:none}
.backdrop{position:absolute;inset:0;background:rgba(0,0,0,.32);opacity:0;transition:opacity .3s}
.sheet{position:absolute;left:0;right:0;bottom:0;background:var(--surface);border-radius:22px 22px 0 0;padding:8px 24px 34px;transform:translateY(103%);transition:transform .5s cubic-bezier(.32,.72,0,1);max-width:640px;margin:0 auto;box-shadow:0 -12px 48px rgba(0,0,0,.12);max-height:92vh;overflow-y:auto}
.sheet-wrap.open{pointer-events:auto}
.sheet-wrap.open .backdrop{opacity:1}
.sheet-wrap.open .sheet{transform:none}
.grabber{width:40px;height:5px;border-radius:3px;background:rgba(0,0,0,.16);margin:8px auto 16px}
.sheet h2{font-size:22px;font-weight:800;letter-spacing:-.4px;margin-bottom:18px}
.field{margin-bottom:14px}
.field span{font-size:13px;font-weight:600;color:#96754e;display:block;margin-bottom:7px}
.field input[type=text],.field input[type=url]{width:100%;background:#f8ecd9;border:1.5px solid transparent;border-radius:14px;padding:13px 15px;font-size:16px;color:var(--text);outline:none;transition:all .2s}
.field input:focus{background:#fffdf8;border-color:var(--accent);box-shadow:0 0 0 4px rgba(224,127,62,.15)}
.check{display:flex;align-items:center;gap:9px;font-size:15px;font-weight:600;color:var(--text);cursor:pointer}
.check input{width:20px;height:20px;accent-color:var(--accent)}
.save{width:100%;border:none;border-radius:999px;background:linear-gradient(120deg,#f0a04e,#e07f3e);color:#fff;font-size:17px;font-weight:700;padding:15px;margin-top:8px;cursor:pointer;transition:transform .15s,background .2s}
.save:hover{background:#e8893f}
.save:active{transform:scale(.97)}
.toast{position:fixed;left:50%;bottom:104px;transform:translateX(-50%) translateY(16px);background:rgba(67,38,13,.93);color:#fff;font-size:14px;font-weight:600;border-radius:999px;padding:11px 24px;opacity:0;transition:all .35s var(--ease);z-index:60;pointer-events:none;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);white-space:nowrap;max-width:92vw;text-overflow:ellipsis;overflow:hidden}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
@media(min-width:900px){
.nav-in,.main{max-width:1024px}
.main{padding:44px 32px 120px}
.list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;align-items:start}
}
</style></head><body>
<div class="nav"><div class="nav-in"><div class="nav-title"><img class="brand-icon" src="/icon.webp" alt=""/>网站收藏</div><button class="nav-out" id="logout">退出</button></div></div>
<div class="main">
<div class="hero"><span class="hpill">我的收藏夹</span><h1>收藏</h1><p><span id="count">正在加载…</span><span id="greet"></span></p><img class="capy" src="/icon.webp" alt=""/></div>
<div class="search"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input id="q" placeholder="搜索标题、网址、备注、标签" autocomplete="off"/></div>
<div class="chips" id="chips"></div>
<div class="toolbar" id="toolbar">
<button class="tbtn primary" id="importBtn">导入</button>
<a class="tbtn" id="expHtml" href="/api/export.html">导出 HTML</a>
<a class="tbtn" id="expJson" href="/api/export.json">导出 JSON</a>
<input type="file" id="importFile" accept=".html,.htm,.json,text/html,application/json" hidden/>
</div>
<div class="list" id="list"><div class="shimmer"></div><div class="shimmer"></div><div class="shimmer"></div></div>
</div>
<button class="fab" id="add" aria-label="新增网站"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>
<div class="sheet-wrap" id="wrap"><div class="backdrop" id="backdrop"></div><div class="sheet">
<div class="grabber"></div><h2 id="sheetTitle">新网站</h2>
<div class="field"><span>标题</span><input type="text" id="fTitle" placeholder="网站名，可空（只填网址时自动用域名）"/></div>
<div class="field"><span>网址 *</span><input type="url" id="fUrl" placeholder="https://example.com" inputmode="url"/></div>
<div class="field"><span>分类</span><input type="text" id="fCat" placeholder="工具 / 资源 / 阅读"/></div>
<div class="field"><span>标签</span><input type="text" id="fTags" placeholder="逗号分隔，如 AI,免费"/></div>
<div class="field"><span>备注</span><input type="text" id="fNote" placeholder="为什么收藏它，可空"/></div>
<div class="field"><label class="check"><input type="checkbox" id="fPinned"/> 置顶</label></div>
<button class="save" id="save">保存</button>
</div></div>
<div class="toast" id="toast"></div>
<script>
(function(){
var ROLE="@@ROLE@@";
var q=document.getElementById('q'),list=document.getElementById('list'),count=document.getElementById('count'),
chips=document.getElementById('chips'),wrap=document.getElementById('wrap'),sheetTitle=document.getElementById('sheetTitle'),
fTitle=document.getElementById('fTitle'),fUrl=document.getElementById('fUrl'),fCat=document.getElementById('fCat'),fTags=document.getElementById('fTags'),fNote=document.getElementById('fNote'),fPinned=document.getElementById('fPinned'),
toastEl=document.getElementById('toast');
var items=[],cat='全部',editing=null,toastT=null;
var gh=new Date().getHours();var gt=gh<6?'夜深了':gh<9?'早上好':gh<12?'上午好':gh<14?'中午好':gh<18?'下午好':'晚上好';var gel=document.getElementById('greet');if(gel)gel.textContent=' · '+gt+'，今天想逛点什么？';
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function toast(m){toastEl.textContent=m;toastEl.classList.add('show');clearTimeout(toastT);toastT=setTimeout(function(){toastEl.classList.remove('show');},2200);}
function api(url,opt){return fetch(url,opt).then(function(r){if(r.status===401){location.reload();throw new Error('auth');}return r.json().then(function(j){return{status:r.status,j:j};});});}
function load(){var p='/api/items?limit=1000';if(cat!=='全部')p+='&cat='+encodeURIComponent(cat);if(q.value.trim())p+='&q='+encodeURIComponent(q.value.trim());
api(p).then(function(x){items=x.j.items||[];render();});
api('/api/cats').then(function(x){renderChips(x.j.cats||[]);});}
function renderChips(cats){var all=['全部'].concat(cats);
chips.innerHTML=all.map(function(c){return '<button class="chip'+(cat===c?' on':'')+'">'+esc(c)+'</button>';}).join('');
Array.prototype.forEach.call(chips.querySelectorAll('.chip'),function(b,i){b.onclick=function(){cat=all[i];load();};});}
function hostOf(u){try{return new URL(u).hostname||'';}catch(e){return '';}}
function render(){
count.textContent=items.length?('共 '+items.length+' 个网站'):'还没有收藏';
if(!items.length){list.innerHTML='<div class="empty"><div class="e-icon"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14.5 14.5 0 0 1 0 18"/><path d="M12 3a14.5 14.5 0 0 0 0 18"/></svg></div><div class="e-t">还没有网站</div><div class="e-s">'+(ROLE==='admin'?'点右下角 + 添加，或点上方导入浏览器收藏夹':'')+'</div></div>';return;}
list.innerHTML=items.map(function(t,i){
var host=hostOf(t.url);
var fav=host?'<img class="fav" alt="" loading="lazy" src="https://www.google.com/s2/favicons?domain='+encodeURIComponent(host)+'&sz=64" onerror="this.remove()"/>':'';
var thumbHtml=t.og_image?'<img class="thumb" alt="" loading="lazy" src="'+esc(t.og_image)+'" data-open="'+t.id+'" onerror="this.remove()"/>':'<div class="thumb ph" data-open="'+t.id+'">'+esc((t.title||host||'链').charAt(0).toUpperCase())+'</div>';
var tagPills=t.tags?String(t.tags).replace(/，/g,',').split(',').map(function(x){return x.trim();}).filter(Boolean).map(function(x){return '<span class="graypill">'+esc(x)+'</span>';}).join(''):'';
var pills=(t.cat?'<span class="tagpill">'+esc(t.cat)+'</span>':'')+tagPills;
var descText=t.note||t.og_desc||'';
var btns=ROLE==='admin'
?'<div class="actions"><button class="iconbtn" data-edit="'+t.id+'" aria-label="编辑"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg></button>'+
'<button class="iconbtn del" data-del="'+t.id+'" aria-label="删除"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></button></div>'
:'';
var pin=t.pinned?'<span class="pin" title="置顶">📌</span>':'';
return '<div class="card" data-id="'+t.id+'" style="animation-delay:'+Math.min(i*45,405)+'ms">'+thumbHtml+'<div class="cbody"><div class="hostrow" data-open="'+t.id+'">'+fav+(host?'<span class="host">'+esc(host)+'</span>':'')+'</div><div class="name" data-open="'+t.id+'">'+pin+esc(t.title||t.url)+'</div>'+(descText?'<div class="desc" data-open="'+t.id+'">'+esc(descText)+'</div>':'')+(pills?'<div class="pillrow">'+pills+'</div>':'')+btns+'</div></div>';}).join('');
Array.prototype.forEach.call(list.querySelectorAll('[data-open]'),function(el){el.onclick=function(){var id=parseInt(el.getAttribute('data-open'),10);var t=null;items.forEach(function(x){if(x.id===id)t=x;});if(t&&t.url)window.open(t.url,'_blank','noopener');};});
Array.prototype.forEach.call(list.querySelectorAll('[data-edit]'),function(b){b.onclick=function(ev){ev.stopPropagation();openSheet(parseInt(b.getAttribute('data-edit'),10));};});
Array.prototype.forEach.call(list.querySelectorAll('[data-del]'),function(b){b.onclick=function(ev){ev.stopPropagation();
var id=parseInt(b.getAttribute('data-del'),10);var el=list.querySelector('[data-id="'+id+'"]');
var t=null;items.forEach(function(x){if(x.id===id)t=x;});
if(!confirm('删除「'+(t?(t.title||t.url):'')+'」？'))return;
if(el)el.classList.add('leaving');
setTimeout(function(){api('/api/items/'+id,{method:'DELETE'}).then(function(){toast('已删除');load();});},230);};});}
function openSheet(id){var t=null;if(id)items.forEach(function(x){if(x.id===id)t=x;});
sheetTitle.textContent=t?'编辑网站':'新网站';
fTitle.value=t?t.title:'';fUrl.value=t?t.url:'';fCat.value=t?t.cat:'';fTags.value=t?t.tags:'';fNote.value=t?t.note:'';fPinned.checked=t?!!t.pinned:false;
editing=id||'new';wrap.classList.add('open');setTimeout(function(){fUrl.focus();},400);}
function closeSheet(){wrap.classList.remove('open');editing=null;}
var deb;q.addEventListener('input',function(){clearTimeout(deb);deb=setTimeout(load,250);});
if(ROLE!=='admin'){document.getElementById('add').style.display='none';document.getElementById('importBtn').style.display='none';}
else{document.getElementById('add').onclick=function(){openSheet(null);};}
if(ROLE==='public'){document.getElementById('toolbar').style.display='none';document.getElementById('expHtml').style.display='none';document.getElementById('expJson').style.display='none';}
document.getElementById('backdrop').onclick=closeSheet;
var navBtn=document.getElementById('logout');
if(ROLE==='public'){navBtn.textContent='管理登录';navBtn.onclick=function(){location.href='/login';};}
else{navBtn.onclick=function(){fetch('/api/logout',{method:'POST'}).then(function(){location.href='/';});};}
document.getElementById('save').onclick=function(){
var url=fUrl.value.trim();if(!url){fUrl.focus();toast('请填网址');return;}
if(url.indexOf('://')<0){while(url.charAt(0)==='/')url=url.slice(1);url='https://'+url;fUrl.value=url;}
var title=fTitle.value.trim();if(!title){title=hostOf(url)||url;}
var body={title:title,url:url,cat:fCat.value.trim(),tags:fTags.value.trim(),note:fNote.value.trim(),pinned:fPinned.checked?1:0};
var u=editing==='new'?'/api/items':'/api/items/'+editing;
var method=editing==='new'?'POST':'PUT';
api(u,{method:method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).then(function(x){
if(x.status===409){toast('这个网址已经收藏过了');return;}
if(x.status>=400){toast('保存失败');return;}
closeSheet();toast(editing==='new'?'已添加':'已保存');load();});};
// ---- 导入 ----
var importFile=document.getElementById('importFile');
if(ROLE==='admin'){document.getElementById('importBtn').onclick=function(){importFile.click();};}
function parseBookmarkHtml(text){
var doc=new DOMParser().parseFromString(text,'text/html');
var nodes=doc.querySelectorAll('h3,a');var cur='';var out=[];
Array.prototype.forEach.call(nodes,function(n){
if(n.tagName==='H3'){cur=n.textContent.trim();}
else if(n.tagName==='A'){var href=n.getAttribute('href')||'';if(/^https?:\\/\\//i.test(href)){out.push({title:(n.textContent||'').trim()||href,url:href,cat:cur,tags:'',note:'',pinned:0});}}});
return out;}
function parseJsonItems(text){
var data=JSON.parse(text);var arr=Array.isArray(data)?data:(data.items||data.bookmarks||[]);
return arr.map(function(x){return{title:x.title||x.name||x.url||x.href||'',url:x.url||x.href||'',cat:x.cat||x.category||'',tags:Array.isArray(x.tags)?x.tags.join(','):(x.tags||''),note:x.note||x.description||'',pinned:x.pinned?1:0};}).filter(function(x){return x.url;});}
importFile.addEventListener('change',function(){
var f=importFile.files&&importFile.files[0];if(!f)return;
var rd=new FileReader();
rd.onload=function(){
try{
var text=String(rd.result||'');
var parsed=/\\.json$/i.test(f.name)?parseJsonItems(text):parseBookmarkHtml(text);
if(!parsed.length){toast('没解析到网址');return;}
toast('正在导入 '+parsed.length+' 条…');
api('/api/import',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:parsed})}).then(function(x){
if(x.status>=400){toast('导入失败');return;}
toast('导入完成：新增 '+x.j.added+'，跳过 '+x.j.skipped);load();});
}catch(e){toast('文件解析失败');}
importFile.value='';};
rd.readAsText(f);});
load();
})();
</script></body></html>
`;

// ---- Telegram 机器人（webhook）：发链接秒存进 LinkVault，只认机主一个 TG 账号 ----
async function tgApi(env, method, payload) {
  try {
    const r = await fetch('https://api.telegram.org/bot' + env.TG_BOT_TOKEN + '/' + method, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    });
    return await r.json();
  } catch (e) { return null; }
}
async function tgCats(env) {
  try {
    const { results } = await env.DB.prepare("SELECT DISTINCT cat FROM bookmarks WHERE cat != '' ORDER BY cat").all();
    return (results || []).map(r => r.cat).filter(Boolean).slice(0, 8);
  } catch (e) { return []; }
}
function tgCatKeyboard(itemId, cats) {
  const row = cats.map((c, i) => ({ text: c, callback_data: 'c:' + itemId + ':' + i }));
  row.push({ text: '不分类', callback_data: 'c:' + itemId + ':_' });
  return { inline_keyboard: [row] };
}
async function handleTelegram(request, env) {
  if (!env.TG_BOT_TOKEN || !env.TG_SECRET || !env.TG_ALLOWED_ID) return new Response('not configured', { status: 503 });
  if (request.headers.get('x-telegram-bot-api-secret-token') !== env.TG_SECRET) return new Response('forbidden', { status: 403 });
  let upd = null;
  try { upd = await request.json(); } catch (e) { return json({ ok: true }); }
  const ok200 = json({ ok: true });
  const cq = upd && upd.callback_query;
  if (cq) {
    if (String(cq.from && cq.from.id) !== String(env.TG_ALLOWED_ID)) return ok200;
    const data = String(cq.data || '');
    if (data.indexOf('c:') === 0) {
      const parts = data.split(':');
      const itemId = parseInt(parts[1], 10);
      const idx = parts[2];
      if (itemId) {
        const row = await env.DB.prepare('SELECT id, title, url FROM bookmarks WHERE id = ?').bind(itemId).first();
        if (row) {
          let label = '不分类';
          if (idx !== '_') {
            const cats = await tgCats(env);
            const catName = cats[parseInt(idx, 10)];
            if (catName) {
              const now = Math.floor(Date.now() / 1000);
              await env.DB.prepare('UPDATE bookmarks SET cat = ?, updated_at = ? WHERE id = ?').bind(catName, now, itemId).run();
              label = catName;
            }
          }
          await tgApi(env, 'answerCallbackQuery', { callback_query_id: cq.id, text: '已分类：' + label });
          const cmsg = cq.message;
          if (cmsg) {
            await tgApi(env, 'editMessageText', {
              chat_id: cmsg.chat.id, message_id: cmsg.message_id,
              text: '✅ 已收藏：' + (row.title || row.url) + (label === '不分类' ? '' : '\n分类：' + label),
            });
          }
        }
      }
    }
    return ok200;
  }
  const msg = upd && upd.message;
  if (!msg || !msg.chat) return ok200;
  if (String(msg.from && msg.from.id) !== String(env.TG_ALLOWED_ID)) return ok200;
  const chatId = msg.chat.id;
  const text = String(msg.text || msg.caption || '').trim();
  const siteLine = '\n\n打开收藏夹：' + SITE_URL;
  if (!text || text.indexOf('/start') === 0 || text.indexOf('/help') === 0) {
    await tgApi(env, 'sendMessage', { chat_id: chatId, text: '🦫 把网址发给我，我就帮你存进「网站收藏」。\n\n小抄：\n· 直接发链接 = 立即收藏\n· 链接后跟 #分类名 = 顺带分类\n· 再后面的文字 = 备注\n· 存好后也可以点我给的按钮选分类' + siteLine });
    return ok200;
  }
  if (text.charAt(0) === '/') {
    await tgApi(env, 'sendMessage', { chat_id: chatId, text: '把网址直接发给我就能收藏 🦫' });
    return ok200;
  }
  const words = text.split(/\s+/);
  let urlWord = '', urlIdx = -1;
  for (let i = 0; i < words.length; i++) {
    const f = fixUrl(words[i]);
    if (f && words[i].indexOf('.') > 0) { urlWord = f; urlIdx = i; break; }
  }
  if (!urlWord) {
    await tgApi(env, 'sendMessage', { chat_id: chatId, text: '没认出网址 👀 把链接发给我就行，比如 https://example.com' });
    return ok200;
  }
  let cat = '';
  const noteParts = [];
  words.forEach((w, i) => {
    if (i === urlIdx) return;
    if (!cat && w.charAt(0) === '#' && w.length > 1) cat = w.slice(1);
    else noteParts.push(w);
  });
  const note = noteParts.join(' ').slice(0, 200);
  const norm = normalizeUrl(urlWord);
  const { results: existing } = await env.DB.prepare('SELECT id, url, title FROM bookmarks').all();
  const dup = (existing || []).find(r => normalizeUrl(r.url) === norm);
  if (dup) {
    await tgApi(env, 'sendMessage', { chat_id: chatId, text: '📌 已经收藏过了：' + (dup.title || dup.url) + siteLine });
    return ok200;
  }
  const pv = await fetchPreview(urlWord);
  const now = Math.floor(Date.now() / 1000);
  const title = (pv && pv.title) || hostOf(urlWord) || urlWord;
  const r = await env.DB.prepare(
    'INSERT INTO bookmarks (title, url, note, cat, tags, pinned, og_image, og_desc, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(title, urlWord, note, cat, '', 0, pv ? pv.image : '', pv ? pv.desc : '', now, now).run();
  const itemId = r.meta.last_row_id;
  let reply = '✅ 已收藏：' + title;
  if (cat) reply += '\n分类：' + cat;
  if (note) reply += '\n备注：' + note;
  const payload = { chat_id: chatId, text: reply + siteLine };
  if (!cat) {
    const cats = await tgCats(env);
    if (cats.length) payload.reply_markup = tgCatKeyboard(itemId, cats);
  }
  await tgApi(env, 'sendMessage', payload);
  return ok200;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/icon.webp') {
      const bin = atob(ICON_B64);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new Response(bytes, { headers: { 'Content-Type': 'image/webp', 'Cache-Control': 'public, max-age=31536000, immutable' } });
    }

    // 强制 HTTPS：http 下浏览器会拒绝写入 Secure 登录 cookie，导致"登录成功却记不住"
    if (url.protocol === 'http:') {
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    if (path === '/telegram/webhook' && request.method === 'POST') {
      return handleTelegram(request, env);
    }

    if (path === '/api/login' && request.method === 'POST') {
      const admin = env.ADMIN || '';
      const guest = env.GUEST || '';
      const ip = _clientIp(request);
      if (_loginBlocked(ip)) {
        return json({ ok: false, blocked: true }, 429);
      }
      let body = {};
      try { body = await request.json(); } catch (e) {}
      let role = null;
      const raw = body.password || '';
      const pw = raw.trim();
      if (admin && (raw === admin || pw === admin)) role = 'admin';
      else if (guest && (raw === guest || pw === guest)) role = 'guest';
      if (role) {
        _loginOk(ip);
        const secret = role === 'admin' ? admin : guest;
        const token = await sha256hex('linkvault|' + role + '|' + secret);
        const r = json({ ok: true, role });
        r.headers.set('Set-Cookie', 'lv_auth=' + token + '; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax');
        return r;
      }
      _loginFail(ip);
      return json({ ok: false }, 401);
    }

    // 统一登录态（带角色）
    const role = await roleOf(request, env);

    if (path === '/api/logout' && request.method === 'POST') {
      const r = json({ ok: true });
      r.headers.set('Set-Cookie', 'lv_auth=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax');
      return r;
    }

    const HTML_HEADERS = { 'Content-Type': 'text/html;charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' };

    if (path === '/' || path === '/index.html') {
      // 公开只读浏览：未登录也直接给应用页，未登录角色记为 public
      return new Response(APP_HTML.replace(/@@ROLE@@/g, role || 'public'), { headers: HTML_HEADERS });
    }

    if (path === '/login' && request.method === 'GET') {
      if (role) return Response.redirect(url.origin + '/', 302);
      return new Response(LOGIN_HTML, { headers: HTML_HEADERS });
    }

    if (path === '/api/cats') {
      const { results } = await env.DB.prepare(
        "SELECT DISTINCT cat FROM bookmarks WHERE cat != '' ORDER BY cat"
      ).all();
      return json({ cats: results.map(r => r.cat) });
    }

    if (path === '/api/items' && request.method === 'GET') {
      const q = (url.searchParams.get('q') || '').trim();
      const cat = (url.searchParams.get('cat') || '').trim();
      const limit = Math.min(parseInt(url.searchParams.get('limit') || '500', 10) || 500, 1000);
      let sql = 'SELECT ' + ROW_COLS + ' FROM bookmarks';
      const conds = [], params = [];
      if (q) { conds.push('(title LIKE ? OR url LIKE ? OR note LIKE ? OR cat LIKE ? OR tags LIKE ?)'); const like = '%' + q + '%'; params.push(like, like, like, like, like); }
      if (cat) { conds.push('cat = ?'); params.push(cat); }
      if (conds.length) sql += ' WHERE ' + conds.join(' AND ');
      sql += ' ORDER BY pinned DESC, updated_at DESC LIMIT ?';
      params.push(limit);
      const { results } = await env.DB.prepare(sql).bind(...params).all();
      return json({ items: results });
    }

    // ---- 导出：仅已登录角色可用（admin/guest），公开浏览不可导出 ----
    if (!role && (path === '/api/export.json' || path === '/api/export.html')) return unauthorized();

    if (path === '/api/export.json' && request.method === 'GET') {
      const { results } = await env.DB.prepare(
        'SELECT ' + ROW_COLS + ' FROM bookmarks ORDER BY pinned DESC, updated_at DESC'
      ).all();
      return new Response(JSON.stringify(results, null, 2), {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Content-Disposition': 'attachment; filename="linkvault-bookmarks.json"',
        },
      });
    }

    if (path === '/api/export.html' && request.method === 'GET') {
      const { results } = await env.DB.prepare(
        'SELECT id, title, url, note, cat, tags, pinned, created_at, updated_at FROM bookmarks ORDER BY cat, pinned DESC, updated_at DESC'
      ).all();
      const groups = new Map();
      for (const r of results) {
        const key = (r.cat || '').trim() || '未分类';
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(r);
      }
      let out = '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n' +
        '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n' +
        '<TITLE>Bookmarks</TITLE>\n<H1>Bookmarks</H1>\n<DL><p>\n';
      for (const [catName, rows] of groups) {
        const firstTs = rows.length && rows[0].created_at ? rows[0].created_at : Math.floor(Date.now() / 1000);
        out += '    <DT><H3 ADD_DATE="' + firstTs + '">' + escHtml(catName) + '</H3>\n    <DL><p>\n';
        for (const r of rows) {
          const ts = r.created_at || Math.floor(Date.now() / 1000);
          out += '        <DT><A HREF="' + escHtml(r.url) + '" ADD_DATE="' + ts + '">' + escHtml(r.title || r.url) + '</A>\n';
          if (r.note) out += '        <DD>' + escHtml(r.note) + '\n';
        }
        out += '    </DL><p>\n';
      }
      out += '</DL><p>\n';
      return new Response(out, {
        headers: {
          'Content-Type': 'text/html;charset=utf-8',
          'Content-Disposition': 'attachment; filename="linkvault-bookmarks.html"',
        },
      });
    }

    // 写操作仅管理员，访客只读
    if (role !== 'admin') return json({ error: 'forbidden' }, 403);

    if (path === '/api/items' && request.method === 'POST') {
      let body = {};
      try { body = await request.json(); } catch (e) {}
      const itemUrl = fixUrl(body.url || '');
      if (!itemUrl) return json({ error: 'invalid url' }, 400);
      const norm = normalizeUrl(itemUrl);
      const { results: existing } = await env.DB.prepare('SELECT id, url FROM bookmarks').all();
      if (existing.some(r => normalizeUrl(r.url) === norm)) return json({ error: 'duplicate' }, 409);
      // 抓 Telegram 式预览（og 信息）；失败不拦保存
      const pv = await fetchPreview(itemUrl);
      const now = Math.floor(Date.now() / 1000);
      const title = (body.title || '').trim() || (pv && pv.title) || hostOf(itemUrl) || itemUrl;
      const r = await env.DB.prepare(
        'INSERT INTO bookmarks (title, url, note, cat, tags, pinned, og_image, og_desc, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(title, itemUrl, (body.note || '').trim(), (body.cat || '').trim(),
        Array.isArray(body.tags) ? body.tags.join(',') : (body.tags || '').trim(),
        body.pinned ? 1 : 0, pv ? pv.image : '', pv ? pv.desc : '', now, now).run();
      const id = r.meta.last_row_id;
      const row = await env.DB.prepare('SELECT ' + ROW_COLS + ' FROM bookmarks WHERE id = ?').bind(id).first();
      return json({ item: row }, 201);
    }

    if (path === '/api/import' && request.method === 'POST') {
      let body = {};
      try { body = await request.json(); } catch (e) {}
      const incoming = Array.isArray(body.items) ? body.items : [];
      const { results: existing } = await env.DB.prepare('SELECT url FROM bookmarks').all();
      const seen = new Set(existing.map(r => normalizeUrl(r.url)));
      const now = Math.floor(Date.now() / 1000);
      const toInsert = [];
      let skipped = 0;
      for (const it of incoming) {
        const itemUrl = fixUrl(it && it.url ? String(it.url) : '');
        if (!itemUrl) { skipped++; continue; }
        const norm = normalizeUrl(itemUrl);
        if (seen.has(norm)) { skipped++; continue; }
        seen.add(norm);
        toInsert.push({
          title: (it.title ? String(it.title) : '').trim() || hostOf(itemUrl) || itemUrl,
          url: itemUrl,
          note: (it.note ? String(it.note) : '').trim(),
          cat: (it.cat ? String(it.cat) : '').trim(),
          tags: Array.isArray(it.tags) ? it.tags.join(',') : (it.tags ? String(it.tags) : '').trim(),
          pinned: it.pinned ? 1 : 0,
          og_image: '',
          og_desc: '',
        });
      }
      // 分块批量插入（D1 batch 一次往返执行多条语句）
      const CHUNK = 50;
      let added = 0;
      for (let i = 0; i < toInsert.length; i += CHUNK) {
        const chunk = toInsert.slice(i, i + CHUNK);
        const stmts = chunk.map(x => env.DB.prepare(
          'INSERT INTO bookmarks (title, url, note, cat, tags, pinned, og_image, og_desc, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        ).bind(x.title, x.url, x.note, x.cat, x.tags, x.pinned, x.og_image, x.og_desc, now, now));
        try {
          await env.DB.batch(stmts);
        } catch (e) {
          for (const s of stmts) { await s.run(); }
        }
        added += chunk.length;
      }
      return json({ added, skipped });
    }

    // 按需刷新某条的预览（无前端入口，保留供以后经 API 调用）
    const pm = path.match(/^\/api\/items\/(\d+)\/preview$/);
    if (pm && request.method === 'POST') {
      const pid = parseInt(pm[1], 10);
      const stored = await env.DB.prepare('SELECT ' + ROW_COLS + ' FROM bookmarks WHERE id = ?').bind(pid).first();
      if (!stored) return json({ error: 'not found' }, 404);
      const pv = await fetchPreview(stored.url);
      if (!pv) return json({ error: 'preview failed' }, 502);
      let title = stored.title || '';
      if (!title.trim() || title === hostOf(stored.url)) title = pv.title || title;
      const now = Math.floor(Date.now() / 1000);
      await env.DB.prepare(
        'UPDATE bookmarks SET title = ?, og_image = ?, og_desc = ?, updated_at = ? WHERE id = ?'
      ).bind(title, pv.image, pv.desc, now, pid).run();
      const row = await env.DB.prepare('SELECT ' + ROW_COLS + ' FROM bookmarks WHERE id = ?').bind(pid).first();
      return json({ item: row });
    }

    const m = path.match(/^\/api\/items\/(\d+)$/);
    if (m) {
      const id = parseInt(m[1], 10);
      if (request.method === 'PUT') {
        let body = {};
        try { body = await request.json(); } catch (e) {}
        const itemUrl = fixUrl(body.url || '');
        if (!itemUrl) return json({ error: 'invalid url' }, 400);
        const stored = await env.DB.prepare('SELECT ' + ROW_COLS + ' FROM bookmarks WHERE id = ?').bind(id).first();
        if (!stored) return json({ error: 'not found' }, 404);
        const norm = normalizeUrl(itemUrl);
        const { results: existing } = await env.DB.prepare('SELECT id, url FROM bookmarks WHERE id != ?').bind(id).all();
        if (existing.some(r => normalizeUrl(r.url) === norm)) return json({ error: 'duplicate' }, 409);
        // 网址变了才重抓预览；没变保留原预览。重抓失败则清空（旧预览是旧网址的，留着会误导）
        let ogImage = stored.og_image || '';
        let ogDesc = stored.og_desc || '';
        if (normalizeUrl(stored.url) !== norm) {
          const pv = await fetchPreview(itemUrl);
          ogImage = pv ? pv.image : '';
          ogDesc = pv ? pv.desc : '';
        }
        const now = Math.floor(Date.now() / 1000);
        const title = (body.title || '').trim() || hostOf(itemUrl) || itemUrl;
        await env.DB.prepare(
          'UPDATE bookmarks SET title = ?, url = ?, note = ?, cat = ?, tags = ?, pinned = ?, og_image = ?, og_desc = ?, updated_at = ? WHERE id = ?'
        ).bind(title, itemUrl, (body.note || '').trim(), (body.cat || '').trim(),
          Array.isArray(body.tags) ? body.tags.join(',') : (body.tags || '').trim(),
          body.pinned ? 1 : 0, ogImage, ogDesc, now, id).run();
        const row = await env.DB.prepare('SELECT ' + ROW_COLS + ' FROM bookmarks WHERE id = ?').bind(id).first();
        return json({ item: row });
      }
      if (request.method === 'DELETE') {
        await env.DB.prepare('DELETE FROM bookmarks WHERE id = ?').bind(id).run();
        return json({ ok: true });
      }
    }

    return new Response('Not found', { status: 404 });
  }
};
