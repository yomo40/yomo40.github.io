import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSiteRepo = repository.endsWith(".github.io");
const inferredBase = repository && !isUserSiteRepo ? `/${repository}` : "/";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://yomo40.github.io",
  base: process.env.SITE_BASE ?? inferredBase,
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-light",
      themes: {
        light: "github-light",
        dark: "github-dark"
      }
    }
  }
});
