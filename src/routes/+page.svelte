<script>
	let { data } = $props();

	// Publications list starts truncated; clicking "Expand" reveals the rest.
	let publicationsExpanded = $state(false);
	let talksExpanded = $state(false);
	let teachingExpanded = $state(false);

	// Reference to the projects scroller div, so the arrow buttons can drive it.
	let projectsScroller;

	// Moves the carousel by exactly one card's width (+ its gap) so the next
	// card lands flush against the left edge. `snap-x snap-mandatory` on the
	// scroller (plus `snap-start` on each card) then locks it precisely in
	// place even if this measurement is a pixel or two off.
	// `behavior: 'instant'` is deliberate, not an oversight: combined with
	// `snap-mandatory`, `'smooth'` scrolling gets silently cancelled/reverted
	// in Chromium (a real interaction bug between smooth-scroll animations
	// and mandatory scroll-snap) — confirmed by testing both here.
	function scrollProjects(direction) {
		if (!projectsScroller) return;
		const firstCard = projectsScroller.children[0];
		if (!firstCard) return;
		const gap = parseFloat(getComputedStyle(projectsScroller).columnGap) || 0;
		const step = firstCard.getBoundingClientRect().width + gap;
		projectsScroller.scrollBy({ left: direction * step, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>FM – Projects</title>
</svelte:head>

<div class="font-object-sans">
	<div class="pt-20 pb-10">
		<div class="relative">
			<h1 class="font-qurdisma relative z-1 text-7xl md:text-[120px]">
				{data.about.bio.title}
			</h1>
			<h2 class="pt-20 md:text-xl">{data.about.bio.description}</h2>
			<div class="absolute -top-25 -right-41 -z-0 w-1/3">
				<img
					src={data.about.bio.portrait[1]}
					alt="little doodle of a smiling face with curly hair"
					class="mb-4 w-full"
				/>
			</div>
		</div>
	</div>
	<div class="relative pt-20 pb-10">
		<!-- `scroll-mt-28` keeps this heading from landing underneath the
		     sticky header when the "Projects" menu item scrolls here. -->
		<h1 id="projects" class="font-qurdisma mb-8 scroll-mt-28 text-7xl">Projects</h1>
		<!-- This `100vw` is a deliberate full-bleed measurement (see the
		     comment in +layout.svelte for why 100vw can overshoot the
		     visible page by the scrollbar's width) — the resulting overhang
		     is clipped safely via `overflow-x: hidden` on <html> in app.css. -->
		<div
			bind:this={projectsScroller}
			class="no-scrollbar mr-[calc((100%_-_100vw)/2)] flex h-150 snap-x snap-mandatory gap-10 overflow-x-auto pr-100"
		>
			{#each data.projects as project (project.slug)}
				<div
					class="group box-shadow hover:shadow-2md mt-5 h-140 w-80 shrink-0 snap-start overflow-hidden rounded border bg-amber-200 shadow-md transition hover:bg-amber-100"
				>
					<a href="/projects/{project.slug}" class="group block h-full">
						<div class=" flex justify-between px-4 py-2">
							<p>{project.data.date}</p>
							<img src="/uploads/icons/r-arrow.svg" alt="Click to go to project" />
						</div>
						{#if project.data.himage}
							<img
								src={project.data.himage}
								alt={project.data.title}
								class="mb-4 h-72 w-full object-cover mix-blend-luminosity group-hover:mix-blend-normal"
							/>
						{/if}
						<h2 class="px-4 text-xl">
							{project.data.title}
						</h2>
						{#if project.data.description}
							<p class="mt-2 px-4 text-sm">{project.data.description}</p>
						{/if}
						{#if project.data.categories}
							<p class="mt-2 px-4 text-xs">
								{project.data.categories.join(', ')}
							</p>
						{/if}
					</a>
				</div>
			{/each}
		</div>
		<div class="mt-6 flex gap-3">
			<button
				type="button"
				onclick={() => scrollProjects(-1)}
				aria-label="Scroll projects left"
				class="flex h-10 w-40 cursor-pointer items-center justify-center"
			>
				<img src="/uploads/icons/r-arrow.svg" alt="" class="w-30 rotate-180" />
			</button>
			<button
				type="button"
				onclick={() => scrollProjects(1)}
				aria-label="Scroll projects right"
				class="flex h-10 w-40 cursor-pointer items-center justify-center"
			>
				<img src="/uploads/icons/r-arrow.svg" alt="" class="w-30" />
			</button>
		</div>
	</div>
	<div class="grid grid-cols-2 gap-x-6 py-20">
		<div>
			<!-- Same `scroll-mt-28` reasoning as the "Projects" heading above. -->
			<h2 id="vitae" class="font-qurdisma my-8 scroll-mt-28 text-7xl">Vitae</h2>
			{@html data.about.html}
		</div>
		<div>
			<h2 class="font-qurdisma my-8 text-7xl">Publications</h2>
			<table class="mt-4 w-full text-left text-sm">
				<tbody>
					{#each publicationsExpanded ? data.about.publications : data.about.publications.slice(0, 2) as pub (pub.link)}
						<tr class="align-top">
							<td class="py-2 pr-4 text-lg">
								<p>{pub.year}</p>
								<a href={pub.link} class="underline">{pub.title}</a>
								<p>{pub.publication}</p>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			{#if data.about.publications.length > 2}
				<div class="relative mt-6 flex items-center">
					<div class="h-px flex-1 bg-current"></div>
					<button
						type="button"
						onclick={() => (publicationsExpanded = !publicationsExpanded)}
						class="mx-3 cursor-pointer rounded-full bg-red-900 px-4 py-1 text-xs text-white"
					>
						{publicationsExpanded ? 'Show Less' : 'Show More'}
					</button>
					<div class="h-px flex-1 bg-current"></div>
				</div>
			{/if}
		</div>
		<div>
			<h2 class="font-qurdisma my-8 text-7xl">Talks</h2>
			<table class="mt-4 w-full text-left text-sm">
				<tbody>
					{#each talksExpanded ? data.about.talks : data.about.talks.slice(0, 3) as talk, t}
						<tr class="align-top">
							<td class="py-2 pr-4 text-lg">
								<p>{talk.year}</p>
								<a href={talk.link} class="underline">{talk.title}</a>
								<p>{talk.place}</p>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			{#if data.about.talks.length > 3}
				<div class="relative mt-6 flex items-center">
					<div class="h-px flex-1 bg-current"></div>
					<button
						type="button"
						onclick={() => (talksExpanded = !talksExpanded)}
						class="mx-3 cursor-pointer rounded-full bg-red-900 px-4 py-1 text-xs text-white"
					>
						{talksExpanded ? 'Show Less' : 'Show More'}
					</button>
					<div class="h-px flex-1 bg-current"></div>
				</div>
			{/if}
		</div>
		<div>
			<h2 class="font-qurdisma my-8 text-7xl">Teaching</h2>
			<table class="mt-4 w-full text-left text-sm">
				<tbody>
					{#each teachingExpanded ? data.about.teaching : data.about.teaching.slice(0, 4) as course, c}
						<tr class="align-top">
							<td class="py-2 pr-4 text-lg">
								<p>{course.year}</p>
								<a href={course.link} class="underline">{course.title}</a>
								<p>{course.place}</p>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			{#if data.about.teaching.length > 4}
				<div class="relative mt-6 flex items-center">
					<div class="h-px flex-1 bg-current"></div>
					<button
						type="button"
						onclick={() => (teachingExpanded = !teachingExpanded)}
						class="mx-3 cursor-pointer rounded-full bg-red-900 px-4 py-1 text-xs text-white"
					>
						{teachingExpanded ? 'Show Less' : 'Show More'}
					</button>
					<div class="h-px flex-1 bg-current"></div>
				</div>
			{/if}
		</div>
	</div>
	<div class="w-full">
		<div class="m-auto w-1/6">
			<img src="/uploads/about/about-chicken.png" />
			<p class="text-sm">Chickens = the best</p>
		</div>
	</div>
</div>
