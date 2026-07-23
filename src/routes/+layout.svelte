<script>
	// Global stylesheet (Tailwind) — imported once here so every route gets it.
	import '../app.css';

	// `children` is the Svelte 5 way of receiving whatever page/route
	// is being rendered inside this layout (equivalent to <slot /> in Svelte 4).
	let { children } = $props();
</script>

<div class="min-h-screen bg-white text-gray-900">
	<header class="border-b border-gray-200 px-6 py-4">
		<nav class="flex gap-6">
			<a href="/" class="font-semibold hover:underline">Francesca Morini</a>
			<a href="/" class="hover:underline">Projects</a>
			<a href="/about" class="hover:underline">About</a>
		</nav>
	</header>

	<main class="mx-auto max-w-4xl px-6 py-10">
		{@render children()}
	</main>
</div>
