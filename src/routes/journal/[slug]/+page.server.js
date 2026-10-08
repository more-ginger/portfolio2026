import { error } from '@sveltejs/kit';
import { getArticlebySlug } from '$lib/server/articles.js';

// `params.slug` comes from the `[slug]` folder name — this is what makes
// every project's .md file reachable at its own URL, e.g. /projects/oekogas.
/** @param {{ params: { slug: string } }} event */
export function load({ params }) {
	const article = getArticlebySlug(params.slug);

	if (!article) {
		error(404, 'Project not found');
	}

	return { article };
}
