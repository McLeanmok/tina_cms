/// <reference types="astro/client" />
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const baseTidbit = z.object({
  title: z.string(),
  pubDate: z.coerce.date(),
  tags: z.array(z.string()).optional(),
  lede: z.string(),
});

const tidbitsHtml = defineCollection({
  loader: glob({
    base: "./src/content/tidbits-html",
    pattern: "**/*.{md,mdx}",
  }),
  schema: baseTidbit,
});

const tidbitsCss = defineCollection({
  loader: glob({ base: "./src/content/tidbits-css", pattern: "**/*.{md,mdx}" }),
  schema: baseTidbit,
});

const tidbitsAudio = defineCollection({
  loader: glob({
    base: "./src/content/tidbits-audio",
    pattern: "**/*.{md,mdx}",
  }),
  schema: baseTidbit,
});
// article content type
const articles = defineCollection({
  loader: glob({
    base: "./src/content/articles",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    lede: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { tidbitsHtml, tidbitsCss, tidbitsAudio, articles };
