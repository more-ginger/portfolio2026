import { error } from '@sveltejs/kit';
import { getArticleBySlug } from '$lib/server/articles.js';

// `params.slug` comes from the `[slug]` folder name — this is what makes
// every article's .md file reachable at its own URL, e.g. /journal/debunking.
/** @param {{ params: { slug: string } }} event */
export function load({ params }) {
	const article = getArticleBySlug(params.slug);

	if (!article) {
		error(404, 'Article not found');
	}

	return { article };
}
