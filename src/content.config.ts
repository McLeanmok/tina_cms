import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const articles = defineCollection({
  loader: glob({
    base: "src/content/articles",
    pattern: "**/*.mdx",
  }),
});

const tidbitsHtml = defineCollection({
  loader: glob({
    base: "src/content/tidbits-html",
    pattern: "**/*.mdx",
  }),
});

const tidbitsCss = defineCollection({
  loader: glob({
    base: "src/content/tidbits-css",
    pattern: "**/*.mdx",
  }),
});

const tidbitsAudio = defineCollection({
  loader: glob({
    base: "src/content/tidbits-audio",
    pattern: "**/*.mdx",
  }),
});

export const collections = { articles, tidbitsHtml, tidbitsCss, tidbitsAudio };
