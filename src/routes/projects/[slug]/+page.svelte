<script>
	// `data.project` comes from +page.server.js's `load()` function.
	let { data } = $props();

	let { data: frontMatter, html } = $derived(data.project);
</script>

<svelte:head>
	<title>{frontMatter.title} — Francesca Morini</title>
</svelte:head>

<article class="font-object-sans mt-6 mb-10 border-b pb-2">
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
	<div class="mt-6 flex w-full flex-wrap items-start border bg-amber-100 text-sm">
		<div class="w-8/9 border-r">
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
			<div class="my-auto w-1/9 p-2 text-center">
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
<a href="/" class="text-sm hover:underline">&larr; Back to projects</a>
