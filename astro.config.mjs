import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

import pagefind from "astro-pagefind";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default defineConfig({
  site: "https://gebna.gg",
  build: {
    format: "file",
  },
  integrations: [mdx(), sitemap(), tailwind(), pagefind(), svelte()],
  experimental: {
    svg: true,
  },
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: { className: ["link-hover"] },
        },
      ],
    ],
  },
});
