<script>
	// `data.article` comes from +page.server.js's `load()` function.
	// Spelled out rather than pulled from './$types.js': SvelteKit 2.70 no
	// longer generates those per-route type files, so the usual import
	// resolves to nothing. `data` holds the parsed front matter.
	/** @type {{ data: { article: { slug: string; data: Record<string, any>; html: string } } }} */
	let { data } = $props();

	let { data: frontMatter, html } = $derived(data.article);
</script>

<svelte:head>
	<title>{frontMatter.title} — Francesca Morini</title>
</svelte:head>

<article class="font-object-sans mt-6 mb-10 pb-2">
	<div class="absolute left-[10rem] z-1 w-50 rotate-10 opacity-60 md:opacity-100">
		<img
			src={frontMatter.badge}
			alt="Badge for the Update Festival in Liepaja Latvia where the workshop took place"
		/>
	</div>
	<div class="relative z-2">
		<h1 class="font-qurdisma text-8xl md:text-9xl">{frontMatter.title}</h1>
		<h2 class="mt-6 text-3xl md:mt-10">{frontMatter.subtitle}</h2>
		<!-- Rendered from the article's markdown body. -->
		<div class="markdown-body mt-10">
			{@html html}
		</div>
	</div>
</article>
<div class="mb-10 w-full">
	<a href="/" class="text-sm hover:underline">&larr; Back to home</a>
</div>
