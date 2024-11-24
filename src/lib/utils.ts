import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
	return Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(date);
}

export function readingTime(html: string) {
	const segmenter = new Intl.Segmenter("en", { granularity: "word" });
	const textOnly = html.replace(/<[^>]+>/g, "");
	const segments = segmenter.segment(textOnly);
	const wordCount = Array.from(segments).length;
	const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
	return `${readingTimeMinutes} min read`;
}
