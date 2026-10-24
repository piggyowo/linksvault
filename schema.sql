-- LinkVault D1 建表语句
-- 用法：Cloudflare 仪表盘 → D1 → linkvault 数据库 → 控制台，粘贴全文执行
-- （或 wrangler d1 execute linkvault --file=./schema.sql）

CREATE TABLE IF NOT EXISTS bookmarks (
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
);

CREATE INDEX IF NOT EXISTS idx_bookmarks_url ON bookmarks(url);
CREATE INDEX IF NOT EXISTS idx_bookmarks_cat ON bookmarks(cat);
