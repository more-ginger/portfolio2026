import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  // Tailwind v4 plugs into Vite directly, no separate postcss.config.js needed.
  plugins: [tailwindcss(), sveltekit()]
});
