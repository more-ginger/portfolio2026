import { getAbout } from '$lib/server/about.js';

export function load() {
	return getAbout();
}
