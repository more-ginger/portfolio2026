import { error } from '@sveltejs/kit';
import { getProjectBySlug } from '$lib/server/projects.js';

// `params.slug` comes from the `[slug]` folder name — this is what makes
// every project's .md file reachable at its own URL, e.g. /projects/oekogas.
export function load({ params }) {
	const project = getProjectBySlug(params.slug);

	if (!project) {
		error(404, 'Project not found');
	}

	return { project };
}
