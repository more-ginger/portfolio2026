<script>
	// `data.project` comes from +page.server.js's `load()` function.
	// Spelled out rather than pulled from './$types.js': SvelteKit 2.70 no
	// longer generates those per-route type files, so the usual import
	// resolves to nothing. `data` holds the parsed front matter.
	/** @type {{ data: { project: { slug: string; data: Record<string, any>; html: string } } }} */
	let { data } = $props();

	let { data: frontMatter, html } = $derived(data.project);
</script>

<svelte:head>
	<title>{frontMatter.title} — Francesca Morini</title>
</svelte:head>

<article class="font-object-sans mt-6 mb-10 pb-2">
	<h1 class="font-qurdisma text-7xl">{frontMatter.title}</h1>

	{#if frontMatter.description}
		<p class="mt-4 text-lg">{frontMatter.description}</p>
	{/if}

	<!-- `items-start` overrides flexbox's default `align-items: stretch`,
	     which was forcing the "Year" box to match the height of the left
	     column (Team/Link) even though its own content is much shorter.
	     `w-fit` stops the row itself from stretching to the full article
	     width — without it, the yellow background (a block-level flex
	     container) filled all the way to the article's right edge, leaving
	     a big blank strip after "Year" that read as the year section being
	     oversized, even though the pink box itself was already content-sized. -->
	<div class="mt-6 w-full rounded border bg-amber-100 text-sm md:flex md:flex-wrap md:items-start">
		<div class="md:w-8/9 md:border-r">
			{#if frontMatter.authors}
				<div class="p-2">
					<h2 class="font-semibold uppercase">Collaborators</h2>
					<p>{frontMatter.authors.join(', ')}</p>
				</div>
			{/if}
			{#if frontMatter.link}
				<div class="border-t p-2">
					<h2 class="font-semibold uppercase">Link</h2>
					<a href={frontMatter.link} class="underline">Go to project</a>
				</div>
			{/if}
		</div>
		{#if frontMatter.date}
			<div class="my-auto border-t p-2 md:w-1/9 md:border-none md:text-center">
				<h2 class="font-semibold uppercase">Year</h2>
				<p>{frontMatter.date}</p>
			</div>
		{/if}
	</div>

	<!-- Rendered from the project's markdown body. -->
	<div class="markdown-body mt-10">
		{@html html}
	</div>
</article>
<div class="mb-10 w-full">
	<a href="/" class="text-sm hover:underline">&larr; Back to projects</a>
</div>
