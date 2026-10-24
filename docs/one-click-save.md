# 一键收藏：iOS 快捷指令 + 桌面书签

目标：看到好网页，一点就存进 LinkVault，不用手动复制粘贴。

## iOS 快捷指令「存到 LinkVault」

原理：Safari 分享菜单调用快捷指令，快捷指令先后调两次接口——
先 `POST /api/login` 拿登录态（当次有效），再 `POST /api/items` 把网址存进去。
重复网址后端自动去重；5 分钟内输错 5 次密码会锁定 10 分钟（防爆破，见 README 权限模型）。

### 搭建步骤

1. iPhone 打开 **快捷指令** App → 右上角 `+` 新建。
2. 点 **添加操作** → 搜 **从分享菜单接收**（或"接收来自共享表单的输入"），
   类型选 **Safari 网页**（这样它才会出现在 Safari 的分享菜单里）。
3. 添加 **获取 URL 的内容**（Get Contents of URL），按下面填：
   - 第一次调用：URL 填 `https://你的域名/api/login`，方法 `POST`，
     请求体 JSON：`{"password":"你的管理员密码"}`
     （快捷指令会保存这次请求的 Cookie，登录态当次有效）
   - 第二次调用：URL 填 `https://你的域名/api/items`，方法 `POST`，
     请求体 JSON：`{"url":"<快捷指令输入>","title":"<Safari 网页标题>"}`
     （`<快捷指令输入>` 就是分享菜单传进来的网址）
4. 最后加一个 **显示通知**，内容写"已收藏"。
5. 给快捷指令起名「存到 LinkVault」，保存。

### 使用

Safari 里打开任何网页 → 点分享 → 找到「存到 LinkVault」→ 通知一弹就存好了。
打开 LinkVault 网页，那条收藏已经在列表里（标题和预览图由后端自动抓取）。

## 桌面半自动小书签

桌面浏览器上最省事的半自动方案：

1. 在浏览器书签栏新建一个书签，名字叫「存到 LinkVault」，网址（URL）填下面这段：

```javascript
javascript:(function(){var t=document.title,u=location.href;var ta=document.createElement('textarea');ta.value=t+'\n'+u;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();alert('已复制标题和链接，去 LinkVault 新增里粘贴');})();
```

2. 用之前先在 LinkVault 网页上点 **管理登录** 输管理员密码登录一次
   （登录 Cookie 有效期 30 天，过期重登一次即可）。
3. 以后看到好网页，点一下这个书签，标题和链接就复制好了；
   再打开 LinkVault 点新增，分别粘贴标题和网址，保存。

## 真正一键直存（后续选项）

桌面端想做到"点一下书签直接存、不跳转不粘贴"，需要改 worker.js 加跨域（CORS）
白名单并重新部署，涉及改代码和重新走部署流程。如果你需要这一步，
按 [部署教程](deploy.md) 的方式改完代码重部署即可（不在本仓库默认方案里，
因为它会放宽接口的跨域策略，默认方案保持最严）。
