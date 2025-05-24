import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";

import pagefind from "astro-pagefind";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://gebna.gg",

  build: {
    format: "file",
  },

  integrations: [mdx(), sitemap(), pagefind(), svelte()],

  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: { className: ["link-hover"] },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          transformers: [
            transformerCopyButton({
              visibility: "hover",
              feedbackDuration: 3_000,
            }),
          ],
        },
      ],
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
