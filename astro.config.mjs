// @ts-check
import { defineConfig } from 'astro/config';
import purgecss from 'astro-purgecss';
export default defineConfig({
    // Add purgecss support to Astro. This will not output anything that is not used in your final build.
  integrations: [purgecss({
    fontFace: true,
   variables: true,
  }),],
});
