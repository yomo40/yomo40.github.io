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
  heroTitle: "这里是yomo40,一个普普通通的废柴",
  heroSubtitle: "最喜欢妖梦了"
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

const normalizeEnvValue = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  const isWrappedInDoubleQuotes =
    trimmed.startsWith('"') && trimmed.endsWith('"');
  const isWrappedInSingleQuotes =
    trimmed.startsWith("'") && trimmed.endsWith("'");

  if (isWrappedInDoubleQuotes || isWrappedInSingleQuotes) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
};

const readEnv = (...keys: string[]): string => {
  const env = import.meta.env as Record<string, unknown>;
  const processEnv =
    (globalThis as { process?: { env?: Record<string, unknown> } }).process
      ?.env ?? {};
  for (const key of keys) {
    const value = normalizeEnvValue(env[key] ?? processEnv[key]);
    if (value) {
      return value;
    }
  }
  return "";
};

export const giscusConfig = {
  repo: readEnv("PUBLIC_GISCUS_REPO", "GISCUS_REPO"),
  repoId: readEnv("PUBLIC_GISCUS_REPO_ID", "GISCUS_REPO_ID"),
  category:
    readEnv("PUBLIC_GISCUS_CATEGORY", "GISCUS_CATEGORY") || "General",
  categoryId: readEnv("PUBLIC_GISCUS_CATEGORY_ID", "GISCUS_CATEGORY_ID"),
  mapping: readEnv("PUBLIC_GISCUS_MAPPING", "GISCUS_MAPPING") || "pathname",
  strict: readEnv("PUBLIC_GISCUS_STRICT", "GISCUS_STRICT") || "0",
  reactionsEnabled:
    readEnv("PUBLIC_GISCUS_REACTIONS_ENABLED", "GISCUS_REACTIONS_ENABLED") ||
    "1",
  emitMetadata:
    readEnv("PUBLIC_GISCUS_EMIT_METADATA", "GISCUS_EMIT_METADATA") || "0",
  inputPosition:
    readEnv("PUBLIC_GISCUS_INPUT_POSITION", "GISCUS_INPUT_POSITION") || "top",
  theme:
    readEnv("PUBLIC_GISCUS_THEME", "GISCUS_THEME") ||
    "preferred_color_scheme",
  lang: readEnv("PUBLIC_GISCUS_LANG", "GISCUS_LANG") || "zh-CN"
};

const requiredGiscusFields: Array<{
  field: keyof Pick<
    typeof giscusConfig,
    "repo" | "repoId" | "category" | "categoryId"
  >;
  env: string;
}> = [
  { field: "repo", env: "PUBLIC_GISCUS_REPO" },
  { field: "repoId", env: "PUBLIC_GISCUS_REPO_ID" },
  { field: "category", env: "PUBLIC_GISCUS_CATEGORY" },
  { field: "categoryId", env: "PUBLIC_GISCUS_CATEGORY_ID" }
];

export const giscusMissingFields = requiredGiscusFields
  .filter(({ field }) => !giscusConfig[field])
  .map(({ env }) => env);

export const commentsEnabled = giscusMissingFields.length === 0;
