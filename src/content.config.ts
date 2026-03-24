import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    category: z.string().min(1),
    series: z.string().optional(),
    cover: z.string().optional(),
    readingTime: z.number().int().positive().optional(),
    toc: z.boolean().default(true)
  })
});

export const collections = {
  blog
};
