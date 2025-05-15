/** @type {import("prettier").Config} */
export default {
  htmlWhitespaceSensitivity: "ignore",
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-svelte",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
