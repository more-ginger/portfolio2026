<script>
	// `data` comes from +page.server.js's `load()` function, which combines
	// about.md (bio text) with personal.json (publications/talks/clients).
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.bio.title} — Francesca Morini</title>
</svelte:head>

<div class="flex flex-wrap gap-8">
	{#if data.bio.portrait}
		<div class="w-full md:w-1/3">
			<img src={data.bio.portrait} alt={data.bio.title} class="rounded" />
			{#if data.bio.portraitCaption}
				<p class="mt-2 text-xs text-gray-500">{data.bio.portraitCaption}</p>
			{/if}
		</div>
	{/if}

	<!-- Rendered from about.md's markdown body. -->
	<div class="markdown-body w-full md:w-1/2 md:flex-1">
		{@html data.html}
	</div>
</div>

<section class="mt-12">
	<h2 class="border-b border-gray-300 pb-1 text-lg font-semibold">Academic publications</h2>
	<table class="mt-4 w-full text-left text-sm">
		<tbody>
			{#each data.publications as pub (pub.link)}
				<tr class="border-t border-gray-200 align-top">
					<td class="py-2 pr-4 text-xs whitespace-nowrap text-gray-400">{pub.year}</td>
					<td class="py-2 pr-4">
						<a href={pub.link} class="underline">{pub.title}</a>
					</td>
					<td class="py-2 text-xs text-gray-400">{pub.publication}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<section class="mt-12">
	<h2 class="border-b border-gray-300 pb-1 text-lg font-semibold">Teaching and public talks</h2>
	<table class="mt-4 w-full text-left text-sm">
		<tbody>
			{#each data.talks as talk (talk.title)}
				<tr class="border-t border-gray-200 align-top">
					<td class="py-2 pr-4 text-xs whitespace-nowrap text-gray-400">
						{talk.year}, {talk.place}
					</td>
					<td class="py-2">{talk.icon} {talk.title}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<section class="mt-12">
	<h2 class="border-b border-gray-300 pb-1 text-lg font-semibold">Selected clients</h2>
	<p class="mt-4 text-sm">
		{#each data.clients as client, i (client)}{client}{i < data.clients.length - 1
				? ' ⚬ '
				: ''}{/each}
	</p>
</section>
