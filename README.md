# yomo40.github.io

这是一个可直接部署在 GitHub Pages 的个人主页 + 博客站点。

## 已包含内容
- 主页（自我介绍、联系方式）
- 博客列表页
- 响应式样式与基础滚动动画

## 你需要替换的信息
- `index.html`
  - 姓名/简介
  - GitHub 链接
  - 邮箱
- `blog/index.html`
  - 文章入口列表（后续发布文章时补充）

## 本地预览
直接双击 `index.html`，或使用任意静态服务器：

```powershell
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 发布到 GitHub Pages
1. 推送到仓库默认分支（通常是 `main`）。
2. 在仓库 `Settings` -> `Pages` 中，`Source` 选择 `Deploy from a branch`。
3. 分支选择 `main`，目录选择 `/ (root)`。
4. 稍等几分钟后访问：`https://yomo40.github.io/`。

## 后续建议
- 每次新增文章：新建一个 `blog/*.html` 页面并在 `blog/index.html` 增加入口。
- 如果你后续文章变多，可升级到静态站点生成器（如 Hugo 或 Astro）。
