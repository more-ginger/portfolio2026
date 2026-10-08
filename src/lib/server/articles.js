// This module is the bridge between the .md project files and the Svelte pages.
// It only ever runs on the server (it lives under lib/server, which SvelteKit
// prevents client code from importing), so it's safe to do file parsing here.

import matter from 'gray-matter';
import { marked } from 'marked';

// `import.meta.glob` is a Vite feature: it finds every file matching the glob
// and, with `eager: true`, inlines its contents right here at build time.
// The result is an object shaped like { '/src/lib/content/projects/foo.md': '...raw text...' }.
const projectFiles = import.meta.glob('/src/lib/content/journal/*.md', {
	query: '?raw',
	import: 'default',
	eager: true,
});

/**
 * Turns the raw glob results into a parsed, sorted list of projects.
 * Each article's markdown body is rendered to HTML once here, so pages
 * don't have to do that work themselves.
 */
function loadArticles() {
	const articles = Object.entries(projectFiles).map(([filePath, raw]) => {
		// `gray-matter` splits the file into front matter (`data`) and body (`content`).
		const { data, content } = matter(raw);

		// Fall back to the filename if a file is ever missing a `slug` field.
		// `split` always yields at least one segment, so `?? ''` is just to
		// satisfy the checker rather than a case that can actually happen.
		const filename = filePath.split('/').pop() ?? '';
		const slug = data.slug ?? filename.replace(/\.md$/, '');

		return {
			slug,
			// Front matter fields: title, authors, categories, date, description, himage, link, ...
			data,
			html: marked.parse(content),
		};
	});

	return articles;
}

// Parsed once per server start/build — the file list doesn't change at runtime.
const articles = loadArticles();

/** All projects, for the homepage listing. */
export function getAllArticles() {
	return articles;
}

/**
 * A single project by its slug, or undefined if no project matches.
 * @param {string} slug
 */
export function getArticlebySlug(slug) {
	return articles.find((project) => project.slug === slug);
}
