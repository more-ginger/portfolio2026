import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Pinned to Netlify rather than adapter-auto: the adapter reads the
		// publish directory straight out of netlify.toml, so the build output
		// and the deploy settings can't drift apart the way they did when
		// Netlify was still pointing at a Next.js `.next` folder.
		adapter: adapter(),
	},
};

export default config;
