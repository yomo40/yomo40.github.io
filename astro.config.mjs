import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSiteRepo = repository.endsWith(".github.io");
const inferredBase = repository && !isUserSiteRepo ? `/${repository}` : "/";
const configuredBase = process.env.SITE_BASE ?? inferredBase;
const normalizedBase =
  configuredBase.endsWith("/") && configuredBase !== "/"
    ? configuredBase.slice(0, -1)
    : configuredBase;

const withBase = (path) => {
  if (
    !path ||
    typeof path !== "string" ||
    !path.startsWith("/") ||
    path.startsWith("//")
  ) {
    return path;
  }

  if (!normalizedBase || normalizedBase === "/") {
    return path;
  }

  if (path === normalizedBase || path.startsWith(`${normalizedBase}/`)) {
    return path;
  }

  return `${normalizedBase}${path}`;
};

const remarkPrefixRootLinksWithBase = () => {
  const walk = (node) => {
    if (!node || typeof node !== "object") return;

    if (
      (node.type === "link" || node.type === "image") &&
      typeof node.url === "string"
    ) {
      node.url = withBase(node.url);
    }

    if (Array.isArray(node.children)) {
      node.children.forEach((child) => walk(child));
    }
  };

  return (tree) => {
    walk(tree);
  };
};

export default defineConfig({
  site: process.env.SITE_URL ?? "https://yomo40.github.io",
  base: configuredBase,
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkPrefixRootLinksWithBase],
    shikiConfig: {
      theme: "github-light",
      themes: {
        light: "github-light",
        dark: "github-dark"
      }
    }
  }
});
