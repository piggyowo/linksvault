# 部署教程：从零开始，一步步搭出 LinkVault

全程只用 Cloudflare 网页仪表盘，不用装任何工具、不写任何命令。
预计 20 分钟。跟着序号做，做完一步再做下一步。

## 准备

- 一个 Cloudflare 账号（没有就去 cloudflare.com 免费注册一个）
- 本仓库的两个文件：`worker.js`、`schema.sql`（先下载到电脑上备用）

## 第 1 步：创建 D1 数据库

1. 打开 Cloudflare 仪表盘，左侧点 **Workers 和 Pages** → 顶部点 **D1**（如果没有 D1 入口，
   先随便创建一个 Worker 再回来，D1 就会出现）。
2. 点 **创建数据库**，名字填 `linkvault`，点创建。
3. 记下这个数据库，名字后面会用到。

## 第 2 步：建表

1. 点进刚建好的 `linkvault` 数据库 → 点 **控制台**（Console）。
2. 把本仓库 `schema.sql` 的全部内容复制，粘贴到 SQL 输入框，点 **执行**。
3. 看到执行成功即可。它建了一张 `bookmarks` 表和两个索引：
   - `idx_bookmarks_url`（按网址去重、查重复用）
   - `idx_bookmarks_cat`（按分类筛选加速用）

## 第 3 步：创建 Worker 并粘贴代码

1. 回到 **Workers 和 Pages** → 点 **创建** → 选 **Worker**（从 Hello World 模板开始）。
2. 名字填 `linkvault`，点 **部署**（先部署一次默认模板，让 Worker 先存在）。
3. 部署成功后点 **编辑代码**（Quick Edit）。
4. 把编辑器里的默认代码全选删掉，把本仓库 `worker.js` 的全部内容粘贴进去。
5. 点 **保存并部署**（Save and Deploy）。等它显示部署成功。

> 注意：如果你要改机器人回复里的收藏夹地址，就在这一步粘贴前改：
> `worker.js` 顶部的 `SITE_URL`，把它改成你自己的域名。
> 不接 Telegram 机器人可以跳过。

## 第 4 步：给 Worker 绑定 D1 数据库

不绑这一步，Worker 连不上数据库，所有接口都会报错。

1. 在 Worker 页面点顶部 **设置** → 左侧 **绑定**（Bindings）。
2. 点 **添加绑定** → 选 **D1 数据库**。
3. 变量名填 `DB`（必须大写，就是这两个字母）。
4. 数据库选第 1 步建的 `linkvault`。
5. 保存后**重新部署一次**（绑定改动要重新部署才生效，页面一般会提示你点部署）。

## 第 5 步：设置管理员密码

密码不写在代码里，存在 Worker 的机密变量里，换密码也不丢数据。

1. 在 Worker 页面点 **设置** → **变量和机密**（Variables and Secrets）。
2. 点 **添加**，类型选 **机密**（Secret），名字填 `ADMIN`，值填你自己定的管理员密码
   （建议 6 位以上字母数字组合；这个密码只管登录，不要和别的账号共用）。
3. 保存。
4. （可选）再加一个 `GUEST` 机密，值填访客密码。访客登录后只能看，不能改。
   想撤回访客权限时，把 `GUEST` 改成一个没人知道的值或删掉，访客立刻全部掉线。

## 第 6 步：打开 workers.dev 访问地址（最容易踩的坑）

通过 API 或模板创建的 Worker，**默认不开启 `*.workers.dev` 访问地址**，
不做这一步，打开地址会看到 Cloudflare 的 "There is nothing here yet" 占位页。

1. 在 Worker 页面点 **设置** → **域和路由**（Domains & Routes）。
2. 找到 **workers.dev 域名** 一栏，把开关打开。
3. 之后你的访问地址就是 `https://linkvault.你的账号子域名.workers.dev`。

现在打开这个地址测试：

- 不登录应该能看到收藏列表（刚搭好是空的，显示"还没有收藏"）。
- 点 **管理登录**（或打开 `/login`），输入第 5 步设的 `ADMIN` 密码，能进管理界面、
  看到右下角新增按钮，说明全通了。

## 第 7 步（可选）：绑定自己的域名

想要 `https://links.你的域名` 这样的地址才做这一步；只用 workers.dev 地址可以跳过。

1. 先把你的域名接入 Cloudflare：仪表盘 **添加站点** → 输入域名 → 按提示去域名注册商那里
   把 nameserver 改成 Cloudflare 给你的两个，等状态变成"已激活"（一般十几分钟到几小时）。
2. 回到 Worker 页面 → **设置** → **域和路由** → **添加自定义域**，输入你想用的子域名
   （例如 `links.你的域名`），确定。DNS 记录由 Cloudflare 自动建好，不用你手动加。
3. 等几分钟证书生效，用新域名打开，看到的和 workers.dev 地址是同一套数据（数据在 D1 里，
   和域名无关，换域名只是改绑定）。

> 常见报错：绑根域名时提示"已有外部 DNS 记录冲突"（409）。
> 原因是域名接入时自动导入了注册商的停放页 A 记录，先去 **DNS → 记录** 里把那几条删掉再绑。

## 第 8 步（可选）：接 Telegram 机器人

见 [telegram-bot.md](telegram-bot.md)。不接机器人不影响网页本身使用。

## 验证清单

做完后逐项打勾：

- [ ] 不登录打开首页，能看到列表和搜索框
- [ ] `/login` 输管理员密码能进，右下角有新增按钮
- [ ] 新增一条收藏，刷新后还在（说明写进 D1 了）
- [ ] 搜标题关键词能搜到它；点分类能筛出它
- [ ] 同一个网址再新增一次，被拒绝或跳过（去重生效）
- [ ] 导出 HTML / JSON 能下载；导入浏览器收藏 HTML 能去重导入

## 常见问题

**Q：打开 workers.dev 地址显示 "There is nothing here yet"？**
A：第 6 步没做，去把 workers.dev 开关打开。

**Q：登录后刷新又退回登录页、进不去？**
A：你打开的是 `http://` 开头的地址，浏览器安全规则不允许 http 页面写登录 Cookie。
本项目代码里已内置强制 `http → https` 跳转，正常用 `https://` 地址打开就不会遇到。

**Q：管理员密码忘了怎么办？**
A：两条路：① 回到 Worker → 设置 → 变量和机密，把 `ADMIN` 编辑成新密码，立即生效；
② 找帮你部署的人用 API 重设。密码只管登录，换密码不丢数据。

**Q：新增时提示"已经收藏过了"？**
A：去重逻辑：网址去掉 `#hash` 和末尾斜杠后相同就判定为同一条，改一下网址或先删旧的。

**Q：以后想换域名怎么办？**
A：数据在 D1 里和域名无关。在 Worker → 域和路由里删掉旧自定义域、加上新的即可，
workers.dev 地址一直能用。

**Q：免费额度够吗？**
A：Worker 每天 10 万次请求、D1 每天 500 万行读 / 10 万行写，个人收藏夹远远用不完。
超限当天服务暂停到 UTC 0 点重置，数据保留。

## 进阶：命令行 / 脚本部署（可选）

如果你会用命令行，有两条更快的路（效果和上面仪表盘操作完全一样）：

**Wrangler（Cloudflare 官方 CLI）**

```bash
npm i -g wrangler
wrangler login
wrangler d1 create linkvault          # 记下输出的 database_id
wrangler d1 execute linkvault --file=./schema.sql
# 在 wrangler.toml 里写好 d1_databases 绑定（变量名 DB）和脚本名 linkvault
wrangler deploy
wrangler secret put ADMIN             # 按提示输入管理员密码
```

**API 脚本（本仓库的 deploy.py）**

```bash
export CF_API_TOKEN='你的 API 令牌（权限：Workers Scripts 编辑 + D1 编辑）'
export CF_ACCOUNT_ID='你的 Cloudflare 账号 ID'
# 可选：export LINKVAULT_DOMAIN='links.你的域名'   # 绑自定义域时用
# 可选：export LINKVAULT_ADMIN='你自己定的管理员密码'  # 不填则随机生成并打印出来
python3 deploy.py
```

脚本会依次做：建库（或复用已有）→ 建表 → 上传 worker.js 并绑定 D1 →
设 ADMIN 密钥 → 打开 workers.dev 路由 →（可选）绑自定义域，最后打印两个访问地址。
