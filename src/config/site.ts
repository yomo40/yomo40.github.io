export const siteConfig = {
  title: "yomo40 的博客",
  description: "记录心理历程、个人思考与学习笔记的静态博客。",
  author: "yomo40",
  githubUser: "yomo40",
  homeCounterUrl:
    "https://camo.githubusercontent.com/d415bf84c82f7bed54e600ad2938388b46bf5c724c3f8fa9e5b344918dcdf4f9/68747470733a2f2f6b6f6d617265762e636f6d2f67687076632f3f757365726e616d653d796f6d6f34302d686f6d6526636f6c6f723d354237303841267374796c653d666c61742d737175617265266c6162656c3d686f6d652b7669657773",
  homeCounterCanonicalUrl:
    "https://komarev.com/ghpvc/?username=yomo40-home&color=5B708A&style=flat-square&label=home+views",
  neteasePlaylistId: "889043208",
  neteasePlaylistUrl: "https://music.163.com/playlist?id=889043208",
  siteUrl: "https://yomo40.github.io",
  heroTitle: "在日常里认真写作",
  heroSubtitle: "把思考与笔记整理成可回看的文字。"
};

export const navLinks = [
  { href: "/", label: "首页" },
  { href: "/blog/", label: "博客" },
  { href: "/timeline/", label: "时间线" },
  { href: "/categories/", label: "分类" },
  { href: "/search/", label: "搜索" },
  { href: "/about/", label: "关于" }
];

export const socialLinks = [
  { href: "https://github.com/yomo40", label: "GitHub" },
  { href: "mailto:3372185839@qq.com", label: "QQ Mail" },
  {
    href: "tencent://message/?uin=3372185839&Site=&Menu=yes",
    label: "QQ Chat"
  },
  { href: "mailto:yomo407325@gmail.com", label: "Gmail" }
];

export const collectionMeta = {
  blog: {
    label: "博客",
    description: "心理历程、个人思考和笔记总结统一收录在这里。"
  }
} as const;

export const acgProfile = {
  watchlist: [
    {
      title: "《魔法使的新娘》S2",
      note: "补番中，重点关注角色成长线。"
    },
    {
      title: "《BanG Dream! It's MyGO!!!!!》",
      note: "重看中，记录群像叙事与镜头节奏。"
    },
    {
      title: "《葬送的芙莉莲》",
      note: "慢节奏复盘，提取“时间感”写作灵感。"
    }
  ],
  keywords: ["群像叙事", "成长痛感", "留白", "章节回环", "反高潮"],
  soundtrack: [
    "春日影 (MyGO!!!!!)",
    "勇者 (YOASOBI)",
    "光るなら (Goose house)"
  ]
} as const;

export const giscusConfig = {
  repo: import.meta.env.PUBLIC_GISCUS_REPO ?? "",
  repoId: import.meta.env.PUBLIC_GISCUS_REPO_ID ?? "",
  category: import.meta.env.PUBLIC_GISCUS_CATEGORY ?? "General",
  categoryId: import.meta.env.PUBLIC_GISCUS_CATEGORY_ID ?? "",
  mapping: "pathname",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "top",
  theme: "preferred_color_scheme",
  lang: "zh-CN"
};

export const commentsEnabled = Boolean(
  giscusConfig.repo &&
    giscusConfig.repoId &&
    giscusConfig.category &&
    giscusConfig.categoryId
);
