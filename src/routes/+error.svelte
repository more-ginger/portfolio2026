<script>
	// SvelteKit renders this instead of its own bare fallback whenever a load
	// function throws — `error(404, 'Project not found')` in the project and
	// journal routes — and also for any URL that matches no route at all.
	// Living at the root of `routes/` means it covers every page, and because
	// it is a normal page it renders inside +layout.svelte, so the header,
	// menu and footer stay put around it.
	import { page } from '$app/state';

	// 404 is the only case worth phrasing warmly; anything else is a genuine
	// fault and shouldn't pretend otherwise.
	let isNotFound = $derived(page.status === 404);

	// The thrown message ('Project not found', 'Article not found', or
	// SvelteKit's own 'Not Found'). Shown quietly as a sub-line: it says which
	// kind of thing was missing, which the generic heading above cannot.
	let detail = $derived(page.error?.message ?? '');
</script>

<svelte:head>
	<title>{isNotFound ? 'Not found' : 'Something went wrong'} — Francesca Morini</title>
	<!-- A broken URL should never end up in a search index. -->
	<meta name="robots" content="noindex" />
</svelte:head>

<!-- `min-h` so this short page still pushes the footer to the bottom of
     the screen; without it the footer lands mid-viewport with bare
     background below, which reads as broken rather than sparse. -->
<div class="font-object-sans mt-10 mb-20 h-full">
	<!-- ───────────────────────────────────────────────────────────────
	     Artwork slot — drop an illustration, a stray badge, a doodle in
	     here. It sits above the text so it reads as the main event; the
	     wrapper is deliberately empty rather than guessing at a design.
	     ─────────────────────────────────────────────────────────────── -->
	<div class="mb-10"></div>

	<h1 class="font-qurdisma text-8xl md:text-8xl">
		{#if page.status === 404}
			{page.status}? Do you mean 808?
		{:else}
			{page.status}
		{/if}
	</h1>

	<h2 class="mt-6 max-w-2xl text-3xl md:mt-10">
		{#if isNotFound}
			<iframe
				width="560"
				height="315"
				src="https://www.youtube.com/embed/9EcjWd-O4jI?si=GklqDxXSa8bLyZUg"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		{:else}
			<p>Something went wrong.</p>
		{/if}
		<p class="mt-10 text-xs">{detail}</p>
	</h2>

	<!-- Somewhere to go next, so the page is never a dead end. -->
	<p class="mt-10">
		<a href="/" class="underline">&larr; Back to home</a>
	</p>
</div>
