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
      {
        name: "authors",
        label: "Authors",
        path: "src/content/authors",
        format: "mdx",
        fields: [
          { type: "string", name: "name", label: "Full Name", isTitle: true, required: true },
          { type: "string", name: "email", label: "Email Address" },
          { type: "image", name: "profilePic", label: "Profile Picture", required: true },
          { type: "rich-text", name: "bio", label: "Author Bio", isBody: true, required: true },
        ],
      },
      {
        name: "categories",
        label: "Categories",
        path: "src/content/categories",
        format: "mdx",
        fields: [
          { type: "string", name: "name", label: "Name", isTitle: true, required: true },
          { type: "rich-text", name: "description", label: "Description", isBody: true },
        ],
      },
      {
        name: "tidbits",
        label: "Tidbits",
        path: "src/content/tidbits",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", required: true },
          {
            type: "reference",
            name: "category",
            label: "Category",
            collections: ["categories"],
            required: true,
          },
          { type: "reference", name: "author", label: "Author", collections: ["authors"] },
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
      },
      {
        name: "articles",
        label: "Articles",
        path: "src/content/articles",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", required: true },
          { type: "reference", name: "author", label: "Author", collections: ["authors"] },
          {
            type: "string",
            name: "lede",
            label: "Lede",
            ui: { component: "textarea" },
          },
          { type: "datetime", name: "date", label: "Date", required: true },
          {
            type: "object",
            name: "categories",
            label: "Categories",
            list: true,
            ui: {
              max: 3,
              itemProps: (item) => ({
                label: item?.category ? item.category : "New Category",
              }),
            },
            fields: [
              {
                type: "reference",
                name: "category",
                label: "Category",
                collections: ["categories"],
                required: true,
              },
            ],
          },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
    ] as Collection[],
  },
});