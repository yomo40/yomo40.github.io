---
title: "首篇模板文章，用于验证页面展示能力"
description: "用于展示博客支持的文本能力、页面能力与写作模板结构。"
date: 2026-02-13
updated: 2026-02-13
draft: false
tags:
  - 模板
  - 写作
category: "模板示例"
series: "博客启动"
cover: "/images/banner-bg.jpg"
readingTime: 12
toc: true
---

## 这篇文章的目的

这是一篇**模板文章**，用于认证站点当前可用能力，帮助后续写作快速开始。

- 支持 `Markdown` 正文写作
- 支持标题目录（H2/H3）
- 支持代码块、表格、引用、任务清单
- 支持图片、站内链接与外链

> 写作的第一原则：先完成，再优化。

---

## 常用文本样式

这里展示基础排版能力：

1. **加粗文本**用于强调重点
2. *斜体文本*用于语气标注
3. ~~删除线~~用于标记废弃观点
4. `行内代码`用于术语或命令

### 任务清单

- [x] 完成模板搭建
- [x] 验证分类、时间线、RSS、搜索
- [ ] 下一篇写真实复盘内容

### 引用与注释

> 记录并不是为了证明自己正确，而是为了看见自己如何变化。

脚注示例：这是一个脚注引用[^note]。

[^note]: 把脚注当作“补充说明区”。

---

## 代码与命令示例

```bash
npm install
npm run dev
npm run build
```

```ts
interface PostMeta {
  title: string;
  date: string;
  category: string;
}

const firstPost: PostMeta = {
  title: "测速模板文章",
  date: "2026-02-13",
  category: "模板示例"
};
```

```json
{
  "feature": "timeline",
  "enabled": true,
  "search": "pagefind"
}
```

---

## 表格

| 模块 | 当前状态 | 说明 |
| --- | --- | --- |
| 首页最近更新 | 已启用 | 仅展示文章列表 |
| 时间线 | 已启用 | 按年份回看文章 |
| 分类 | 已启用 | 按主题聚合文章 |
| RSS | 已启用 | 用于订阅更新 |
| 搜索 | 已启用 | Pagefind 静态检索 |

---

## 链接与图片

- 站内链接：[查看时间线](/timeline/)
- 站内链接：[查看分类](/categories/)
- 外部链接：[Astro 官方文档](https://docs.astro.build/)

![模板配图](/images/avatar.jpg)

---

## 折叠内容示例

<details>
<summary>点击展开：写作提示</summary>


</details>

