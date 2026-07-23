<script>
	// `data` comes from +page.server.js's `load()` function.
	let { data } = $props();
</script>

<svelte:head>
	<title>Francesca Morini — Projects</title>
</svelte:head>

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
