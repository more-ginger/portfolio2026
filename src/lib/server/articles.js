// This module is the bridge between the .md journal files and the Svelte pages.
// It only ever runs on the server (it lives under lib/server, which SvelteKit
// prevents client code from importing), so it's safe to do file parsing here.

import matter from 'gray-matter';
import { marked } from 'marked';

// `import.meta.glob` is a Vite feature: it finds every file matching the glob
// and, with `eager: true`, inlines its contents right here at build time.
// The result is an object shaped like { '/src/lib/content/journal/foo.md': '...raw text...' }.
const articleFiles = import.meta.glob('/src/lib/content/journal/*.md', {
	query: '?raw',
	import: 'default',
	eager: true,
});

/**
 * Turns the raw glob results into a parsed list of articles.
 * Each article's markdown body is rendered to HTML once here, so pages
 * don't have to do that work themselves.
 */
function loadArticles() {
	const articles = Object.entries(articleFiles).map(([filePath, raw]) => {
		// `gray-matter` splits the file into front matter (`data`) and body (`content`).
		const { data, content } = matter(raw);

		// Fall back to the filename if a file is ever missing a `slug` field.
		// `split` always yields at least one segment, so `?? ''` is just to
		// satisfy the checker rather than a case that can actually happen.
		const filename = filePath.split('/').pop() ?? '';
		const slug = data.slug ?? filename.replace(/\.md$/, '');

		return {
			slug,
			// Front matter fields: title, subtitle, authors, categories, date, ...
			data,
			html: marked.parse(content),
		};
	});

	return articles;
}

// Parsed once per server start/build — the file list doesn't change at runtime.
const articles = loadArticles();

/** All articles, newest first in file order. */
export function getAllArticles() {
	return articles;
}

/**
 * A single article by its slug, or undefined if no article matches.
 * @param {string} slug
 */
export function getArticleBySlug(slug) {
	return articles.find((article) => article.slug === slug);
}
