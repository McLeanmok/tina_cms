// Run this from your project root: node migrate-tidbits.mjs
//
// What it does:
//   1. Creates src/content/categories/{html,css,audio}.mdx
//   2. Copies every .mdx from src/content/tidbits-{html,css,audio}
//      into src/content/tidbits/, injecting `category: <slug>` into
//      the frontmatter.
//   3. Leaves your original tidbits-html/css/audio folders untouched
//      (delete them yourself once you've verified the new files).

import { promises as fs } from "fs";
import path from "path";

const CATEGORIES = [
  { slug: "html", label: "HTML", dir: "src/content/tidbits-html" },
  { slug: "css", label: "CSS", dir: "src/content/tidbits-css" },
  { slug: "audio", label: "Audio", dir: "src/content/tidbits-audio" },
];

const OUT_TIDBITS = "src/content/tidbits";
const OUT_CATEGORIES = "src/content/categories";

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function injectCategory(fileText, slug) {
  const match = fileText.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    throw new Error(
      "No frontmatter block found — expected file to start with '---'",
    );
  }
  const [fullMatch, frontmatterBody] = match;
  const rest = fileText.slice(fullMatch.length);

  const newFrontmatter = `${frontmatterBody}\ncategory: ${slug}`;
  return `---\n${newFrontmatter}\n---\n${rest}`;
}

async function writeCategoryFiles() {
  await ensureDir(OUT_CATEGORIES);
  for (const { slug, label } of CATEGORIES) {
    const filePath = path.join(OUT_CATEGORIES, `${slug}.mdx`);
    const content = `---\nname: ${label}\n---\n`;
    await fs.writeFile(filePath, content, "utf8");
    console.log(`created ${filePath}`);
  }
}

async function migrateTidbits() {
  await ensureDir(OUT_TIDBITS);

  for (const { slug, dir } of CATEGORIES) {
    let files;
    try {
      files = await fs.readdir(dir);
    } catch (err) {
      console.warn(`skipping ${dir} (not found): ${err.message}`);
      continue;
    }

    const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

    for (const file of mdxFiles) {
      const srcPath = path.join(dir, file);
      const raw = await fs.readFile(srcPath, "utf8");

      let updated;
      try {
        updated = injectCategory(raw, slug);
      } catch (err) {
        console.error(`FAILED on ${srcPath}: ${err.message}`);
        continue;
      }

      // Prefix with category slug to guarantee uniqueness across the
      // three merged folders, unless the filename already starts with it.
      const outName =
        file.startsWith(`${slug}-`) || file.startsWith(`${slug}_`)
          ? file
          : `${slug}-${file}`;
      const outPath = path.join(OUT_TIDBITS, outName);

      await fs.writeFile(outPath, updated, "utf8");
      console.log(`migrated ${srcPath} -> ${outPath}`);
    }
  }
}

async function main() {
  await writeCategoryFiles();
  await migrateTidbits();
  console.log("\nDone. Review src/content/tidbits and src/content/categories,");
  console.log(
    "then delete the old tidbits-html/tidbits-css/tidbits-audio folders.",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
