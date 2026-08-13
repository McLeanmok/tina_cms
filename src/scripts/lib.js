// src/lib/tidbits.ts
import { getCollection } from 'astro:content';

export const TIDBIT_COLLECTIONS = [
  'tidbitsHtml',
  'tidbitsCss', 
  'tidbitsAudio',
];

export async function getAllTidbits() {
  const results = await Promise.all(
    TIDBIT_COLLECTIONS.map(c => getCollection(c))
  );
  return results.flat();
}