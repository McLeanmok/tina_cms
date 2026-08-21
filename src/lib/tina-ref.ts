import { getEntry, type CollectionKey } from "astro:content";

type TinaRef = { id: string } | string | undefined;

/** Strip Tina's full-path reference format down to the bare id Astro expects. */
export function tinaRefToId(collection: string, ref: TinaRef): string | undefined {
  if (!ref) return undefined;
  const raw = typeof ref === "string" ? ref : ref.id;
  return raw
    .replace(new RegExp(`^src/content/${collection}/`), "")
    .replace(/\.mdx?$/, "");
}

/** Resolve a Tina-style reference straight to its entry. */
export async function resolveTinaRef(collection: CollectionKey, ref: TinaRef) {
  const id = tinaRefToId(collection, ref);
  if (!id) return undefined;
  return getEntry(collection, id);
}