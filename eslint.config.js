// Flat config (ESLint 9+). Catches actual bugs (unused vars, undefined
// globals, etc.); all *style* rules are left to Prettier, so this and
// Prettier never fight over formatting.
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default [
	js.configs.recommended,
	...svelte.configs['flat/recommended'],
	// Turns off ESLint's own stylistic rules (and Svelte's) that would
	// otherwise conflict with Prettier's formatting.
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			ecmaVersion: 2024,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			// We render our own trusted markdown (from src/lib/content) via
			// {@html}, never user input, so the XSS warning doesn't apply here.
			'svelte/no-at-html-tags': 'off',
			// This site uses plain <a href> links rather than SvelteKit's
			// typed-router resolve() helper — not needed for a small static site.
			'svelte/no-navigation-without-resolve': 'off',
			// Missing keys matter for reorderable lists; ours are static, so
			// warn instead of hard-failing `npm run lint`.
			'svelte/require-each-key': 'warn',
		},
	},
	{
		ignores: ['.svelte-kit/', 'build/', 'node_modules/', 'static/'],
	},
];
