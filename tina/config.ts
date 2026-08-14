import { defineConfig, type Collection } from "tinacms";

export default defineConfig({
  branch: "main", // or your default branch
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      tidbitCollection(
        "tidbitsHtml",
        "TidbitsHtml",
        "src/content/tidbits-html",
      ),
      tidbitCollection("tidbitsCss", "TidbitsCss", "src/content/tidbits-css"),
      tidbitCollection(
        "tidbitsAudio",
        "TidbitsAudio",
        "src/content/tidbits-audio",
      ),
      {
        name: "articles",
        label: "Articles",
        path: "src/content/articles",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", required: true },
          {
            type: "string",
            name: "lede",
            label: "Lede",
            ui: { component: "textarea" },
          },
          { type: "datetime", name: "date", label: "Date", required: true },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
    ] as Collection[],
  },
});

// shared shape for the three tidbit collections
function tidbitCollection(
  name: string,
  label: string,
  path: string,
): Collection {
  return {
    name,
    label,
    path,
    format: "mdx",
    fields: [
      { type: "string", name: "title", label: "Title", required: true },
      {
        type: "datetime",
        name: "pubDate",
        label: "Publish Date",
        required: true,
      },
      {
        type: "string",
        name: "tags",
        label: "Tags",
        list: true,
        ui: { component: "tags" },
      },
      {
        type: "string",
        name: "lede",
        label: "Lede",
        ui: { component: "textarea" },
      },
      { type: "rich-text", name: "body", label: "Body", isBody: true },
    ],
  };
}
