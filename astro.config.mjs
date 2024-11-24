import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
	site: "https://karimdaghari.com",
	integrations: [tailwind(), sitemap(), mdx(), pagefind()],
	markdown: {
		shikiConfig: {
			theme: "css-variables",
		},
	},
	redirects: {
		"/x": "https://bsky.app/profile/karimdaghari.com",
		"/bsky": "https://bsky.app/profile/karimdaghari.com",
		"/linkedin": "https://www.linkedin.com/in/karimdaghari",
		"/github": "https://www.github.com/karimdaghari",
	},
});
