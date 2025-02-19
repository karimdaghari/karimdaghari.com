import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
	TITLE: "Karim Daghari",
	DESCRIPTION: "KD's little corner of the internet.",
	EMAIL: "hi@karimdaghari.com",
	NUM_POSTS_ON_HOMEPAGE: 3,
	NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
	TITLE: "Home",
	DESCRIPTION: "Welcome to my little corner of the internet.",
};

export const BLOG: Metadata = {
	TITLE: "Blog",
	DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
	TITLE: "Projects",
	DESCRIPTION:
		"A collection of my projects, some with links to repositories and live demos.",
};

export const SOCIALS: Socials = [
	{
		NAME: "LinkedIn",
		HREF: "https://www.linkedin.com/in/karmdaghari",
	},
	{
		NAME: "GitHub",
		HREF: "https://github.com/karimdaghari",
	},
	{
		NAME: "X",
		HREF: "https://www.x.com/karimdaghari_",
	},
	{
		NAME: "Bluesky",
		HREF: "https://bsky.app/profile/karimdaghari.com",
	},
];

export const RESUME_URL =
	"https://docs.google.com/document/d/1Tk9TD9NA2JFgQ6k4VXkwY_ADSks7jiRw1AXH0QIirC4/edit?usp=sharing";
