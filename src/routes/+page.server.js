import { getAllProjects } from '$lib/server/projects.js';
import { getAbout } from '$lib/server/about';

// `load` runs on the server before the page renders and its return value
// becomes the `data` prop available in +page.svelte.
export function load() {
	const projects = getAllProjects().map((project) => ({
		slug: project.slug,
		data: project.data,
	}));

	const about = getAbout();

	return { projects, about };
}
