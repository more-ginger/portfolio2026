import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto picks the right deployment adapter (Vercel, Netlify, Node, etc.)
    // based on where you deploy. Swap for a specific adapter later if needed.
    adapter: adapter()
  }
};

export default config;
