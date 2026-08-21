// src/lib/tidbits.ts
import { getCollection } from 'astro:content';

export async function getAllTidbits() {
  return getCollection('tidbits');
}

export async function getTidbitsByCategory(categorySlug) {
  const tidbits = await getCollection('tidbits');
  return tidbits.filter((t) => t.data.category.id === categorySlug);
}