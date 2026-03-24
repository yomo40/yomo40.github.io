import { getCollection, type CollectionEntry } from "astro:content";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

export type BlogCollection = "blog";
export type BlogEntry = CollectionEntry<"blog">;

export interface PostItem {
  collection: BlogCollection;
  entry: BlogEntry;
  permalink: string;
}

export interface TermItem {
  name: string;
  slug: string;
  count: number;
}

function hasRealMarkdownContent(dir = resolve(process.cwd(), "src", "content", "blog")) {
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (hasRealMarkdownContent(resolve(dir, entry.name))) {
          return true;
        }
      } else if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

export function slugifyTerm(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-\u4e00-\u9fff]/g, "");
}

export function getEntrySlug(entry: { id: string }) {
  return entry.id.replace(/\.(md|mdx)$/i, "");
}

function toPostItem(entry: BlogEntry): PostItem {
  return {
    collection: "blog",
    entry,
    permalink: `/blog/${getEntrySlug(entry)}/`
  };
}

function compareDateDesc(a: PostItem, b: PostItem) {
  return b.entry.data.date.getTime() - a.entry.data.date.getTime();
}

export async function getCollectionEntries(): Promise<BlogEntry[]> {
  if (!hasRealMarkdownContent()) {
    return [];
  }
  return (await getCollection("blog")).filter((entry) => !entry.data.draft);
}

export async function getPostsByCollection(_: BlogCollection = "blog") {
  const entries = await getCollectionEntries();
  return entries.map((entry) => toPostItem(entry)).sort(compareDateDesc);
}

export async function getAllPosts() {
  return getPostsByCollection("blog");
}

export async function getCategoryIndex(): Promise<TermItem[]> {
  const posts = await getAllPosts();
  const map = new Map<string, { name: string; count: number }>();

  for (const post of posts) {
    const name = post.entry.data.category;
    const slug = slugifyTerm(name);
    const prev = map.get(slug);
    if (prev) {
      prev.count += 1;
    } else {
      map.set(slug, { name, count: 1 });
    }
  }

  return Array.from(map.entries())
    .map(([slug, value]) => ({ slug, ...value }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "zh-CN"));
}

export async function getSidebarData() {
  const [recentPosts, categories] = await Promise.all([
    getAllPosts(),
    getCategoryIndex()
  ]);

  return {
    recentPosts: recentPosts.slice(0, 5),
    categories
  };
}
