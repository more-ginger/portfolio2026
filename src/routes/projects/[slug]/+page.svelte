<script>
	// `data.project` comes from +page.server.js's `load()` function.
	let { data } = $props();

	let { data: frontMatter, html } = $derived(data.project);
</script>

<svelte:head>
	<title>{frontMatter.title} — Francesca Morini</title>
</svelte:head>

<a href="/" class="text-sm text-gray-500 hover:underline">&larr; Back to projects</a>

<article class="mt-6">
	<h1 class="text-3xl font-bold">{frontMatter.title}</h1>

	{#if frontMatter.description}
		<p class="mt-4 text-lg italic text-gray-600">{frontMatter.description}</p>
	{/if}

	<div class="mt-6 flex flex-wrap gap-x-10 gap-y-2 text-sm text-gray-500">
		{#if frontMatter.authors}
			<div>
				<h2 class="font-semibold uppercase">Team and partners</h2>
				<p>{frontMatter.authors.join(', ')}</p>
			</div>
		{/if}
		{#if frontMatter.date}
			<div>
				<h2 class="font-semibold uppercase">Year</h2>
				<p>{new Date(frontMatter.date).getFullYear()}</p>
			</div>
		{/if}
		{#if frontMatter.link}
			<div>
				<h2 class="font-semibold uppercase">Link</h2>
				<a href={frontMatter.link} class="underline">Go to project</a>
			</div>
		{/if}
	</div>

	<!-- Rendered from the project's markdown body. Content is trusted here
	     because it comes from our own repo's .md files, not user input. -->
	<div class="markdown-body mt-10">
		{@html html}
	</div>
</article>
