import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const articles = defineCollection({
  loader: glob({
    base: "src/content/articles",
    pattern: "**/*.mdx",
  }),
  schema: z.object({
    title: z.string(),
    lede: z.string().optional(),
    date: z.coerce.date(),
    categories: z
      .array(z.object({ category: reference("categories") }))
      .max(3)
      .default([]),
    author: reference("authors").optional(),
  }),
});

const categories = defineCollection({
  loader: glob({
    base: "src/content/categories",
    pattern: "**/*.mdx",
  }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

const tidbits = defineCollection({
  loader: glob({
    base: "src/content/tidbits",
    pattern: "**/*.mdx",
  }),
  schema: z.object({
    title: z.string(),
    category: reference("categories"),
    author: reference("authors").optional(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    lede: z.string().optional(),
  }),
});

const authors = defineCollection({
  loader: glob({
    base: "src/content/authors",
    pattern: "**/*.mdx",
  }),
  schema: z.object({
    name: z.string(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

export const collections = { articles, authors, categories, tidbits };