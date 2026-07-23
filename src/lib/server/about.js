// Loads the About page: a short bio (about.md) plus the structured CV data
// (personal.json) that used to live behind a Netlify CMS "file" collection.

import matter from 'gray-matter';
import { marked } from 'marked';
import personal from '$lib/content/personal.json';

// Same glob approach as projects.js, just for the single about.md file.
const aboutFiles = import.meta.glob('/src/lib/content/about.md', {
	query: '?raw',
	import: 'default',
	eager: true,
});
const [aboutRaw] = Object.values(aboutFiles);
const { data: bio, content } = matter(aboutRaw);
const html = marked.parse(content);

export function getAbout() {
	return {
		// Front matter fields: title, description, portrait, portraitCaption.
		bio,
		html,
		// Newest first, matching the original site's ordering.
		publications: [...personal.publications].reverse(),
		talks: [...personal.talks].reverse(),
		clients: [...personal.clients].reverse(),
		// `personal.exhibitions` also exists in the data but, like on the
		// original site, isn't rendered on the About page.
	};
}
