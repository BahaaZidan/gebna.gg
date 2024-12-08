import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://gebna.gg",
  build: {
    format: "file",
  },
  integrations: [mdx(), sitemap(), tailwind(), pagefind(), svelte()],
  experimental: {
    svg: true,
  },
});
