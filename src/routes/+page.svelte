<script>
	// `data` comes from +page.server.js's `load()` function.
	let { data } = $props();
</script>

<svelte:head>
	<title>FM – Projects</title>
</svelte:head>

<div>
	<div>
		<div>
			<img
				src={data.about.bio.portrait[0]}
				alt="little doodle of a smiling face with curly hair"
				class="mb-4 max-h-72 w-full rounded object-cover"
			/>
			<h1>{data.about.bio.title}</h1>
			<h1>{data.about.bio.description}</h1>
		</div>
	</div>
	<div>
		<h1 class="mb-8 text-3xl font-bold">Projects</h1>
		<ul class="flex flex-col gap-8">
			{#each data.projects as project (project.slug)}
				<li class="border-b border-gray-200 pb-8">
					<a href="/projects/{project.slug}" class="group block">
						{#if project.data.himage}
							<img
								src={project.data.himage}
								alt={project.data.title}
								class="mb-4 max-h-72 w-full rounded object-cover"
							/>
						{/if}
						<h2 class="text-xl font-semibold group-hover:underline">
							{project.data.title}
						</h2>
						{#if project.data.description}
							<p class="mt-2 text-gray-600">{project.data.description}</p>
						{/if}
						{#if project.data.categories}
							<p class="mt-2 text-sm text-gray-400">
								{project.data.categories.join(', ')}
							</p>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	</div>
	<div>
		<div>
			{@html data.about.html}
		</div>
		<div>
			<h2 class="border-b border-gray-300 pb-1 text-lg font-semibold">Academic publications</h2>
			<table class="mt-4 w-full text-left text-sm">
				<tbody>
					{#each data.about.publications as pub (pub.link)}
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
		</div>
		<div>
			<h2 class="border-b border-gray-300 pb-1 text-lg font-semibold">Teaching and public talks</h2>
			<table class="mt-4 w-full text-left text-sm">
				<tbody>
					{#each data.about.talks as talk (talk.title)}
						<tr class="border-t border-gray-200 align-top">
							<td class="py-2 pr-4 text-xs whitespace-nowrap text-gray-400">
								{talk.year}, {talk.place}
							</td>
							<td class="py-2">{talk.icon} {talk.title}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
