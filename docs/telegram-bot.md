# Telegram 机器人：发链接即收藏

给机器人发个网址，它就自动存进你的 LinkVault，顺带抓标题和预览图。
只认你一个人，陌生人发消息会被静默忽略（不回复、不报错）。

## 搭建步骤

### 1. 在 BotFather 建机器人

1. Telegram 里搜 `@BotFather`，发 `/newbot`，按提示起个名字和用户名
   （用户名必须以 `bot` 结尾，例如 `@Capylink_bot`）。
2. 建好后 BotFather 会给你一串 token，形如 `123456:ABC-DEF...`，复制保存好。
   **这个 token 等于机器人的密码，不要发给别人、不要写进代码。**

### 2. 拿到你自己的 Telegram 数字 ID

1. Telegram 里搜 `@userinfobot`，点开始，它会回复一串数字，那就是你的用户 ID。
2. 记下来，后面填 `TG_ALLOWED_ID` 用（只有这个 ID 发的消息机器人理）。

### 3. 在 Worker 里设三个机密

到 Worker 页面 → **设置** → **变量和机密**，类型都选 **机密**，加三条：

| 名字 | 值 |
|---|---|
| `TG_BOT_TOKEN` | 第 1 步拿到的机器人 token |
| `TG_SECRET` | 你自己编的一串随机字符（例如 20 位字母数字），用来校验 webhook 请求 |
| `TG_ALLOWED_ID` | 第 2 步拿到的你的数字 ID |

### 4. 挂 webhook

在浏览器地址栏打开下面这个网址（把两处占位符换成你自己的），看到 `{"ok":true}` 就成了：

```
https://api.telegram.org/bot<你的机器人token>/setWebhook?url=https://你的域名/telegram/webhook&secret_token=<你的TG_SECRET>
```

- `你的域名`：就是 LinkVault 的访问地址（workers.dev 地址或自定义域都行）
- 机器人以后收到的每条消息，Telegram 都会 POST 到这个 `/telegram/webhook` 地址；
  Worker 先校验请求头的 `x-telegram-bot-api-secret-token` 是不是等于 `TG_SECRET`，
  对不上直接 403，防别人冒充 Telegram 往里灌消息。

### 5. 测试

给机器人发一条链接，例如 `https://example.com`，它应该回：

```
✅ 已收藏：example.com

打开收藏夹：https://你的域名
```

然后打开网页，那条收藏已经在列表里了。

## 用法小抄

| 发什么 | 机器人干什么 |
|---|---|
| 直接发链接 | 自动抓标题和预览图，存进收藏夹 |
| `链接 #分类 备注` | 同上，并按 `#` 后面的词归类，剩下的字当备注（备注最长 200 字） |
| 发链接但不写分类 | 机器人回一条带分类按钮的消息，点一下就归类；也可以点"不分类" |
| 发已经收藏过的链接 | 回"📌 已经收藏过了：标题"，不重复存 |
| 发不带链接的话 | 回"没认出网址"，让你重发 |
| `/start` 或 `/help` | 回用法小抄 |
| 陌生人发消息 | 静默忽略，不回复 |

说明：

- 分类按钮最多显示已有的前 8 个分类。
- 机器人抓预览图和网页版新增是同一套逻辑（og:title / og:description / og:image）。
- 网址去重和网页版一致：去掉 `#hash` 和末尾斜杠后相同即判定重复。
