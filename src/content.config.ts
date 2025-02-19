import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		draft: z.boolean().optional(),
	}),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/projects" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		logo: z.string().optional(),
		draft: z.boolean().optional(),
		demoURL: z.string().optional(),
		repoURL: z.string().optional(),
		websiteURL: z.string().optional(),
	}),
});

export const collections = { blog, projects };
