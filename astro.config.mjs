import tailwind from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
	site: "https://karimdaghari.com",
	vite: {
		plugins: [tailwind()],
	},
	integrations: [sitemap(), mdx(), pagefind()],
	markdown: {
		shikiConfig: {
			theme: "css-variables",
		},
	},
});
