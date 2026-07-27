<script lang="ts">
	let { data } = $props();

	// Publications list starts truncated; clicking "Expand" reveals the rest.
	let publicationsExpanded = $state(false);
	let talksExpanded = $state(false);
	let teachingExpanded = $state(false);
	let profileHovered = $state(false);

	// Reference to the projects scroller div, so the arrow buttons can drive it.
	let projectsScroller: HTMLDivElement | null = null;

	// Which card sits first in the visible row, and which card the cursor is
	// on. The first card wears the hover look by default so the row never
	// reads as inert; hovering any card hands that look over to the cursor.
	let activeIndex = $state(0);
	let hoveredIndex = $state<number | null>(null);

	// Same card-width + gap measurement `scrollProjects` uses below, so the
	// active card always matches wherever scroll-snap actually settles.
	function updateActiveCard() {
		if (!projectsScroller) return;
		const firstCard = projectsScroller.children[0];
		if (!firstCard) return;
		const gap = parseFloat(getComputedStyle(projectsScroller).columnGap) || 0;
		const step = firstCard.getBoundingClientRect().width + gap;
		activeIndex = Math.round(projectsScroller.scrollLeft / step);
	}

	// Moves the carousel by exactly one card's width (+ its gap) so the next
	// card lands flush against the left edge. `snap-x snap-mandatory` on the
	// scroller (plus `snap-start` on each card) then locks it precisely in
	// place even if this measurement is a pixel or two off.
	// `behavior: 'instant'` is deliberate, not an oversight: combined with
	// `snap-mandatory`, `'smooth'` scrolling gets silently cancelled/reverted
	// in Chromium (a real interaction bug between smooth-scroll animations
	// and mandatory scroll-snap) — confirmed by testing both here.
	function scrollProjects(direction: number) {
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
	<!-- `min-h-screen` keeps this filling roughly one mobile screen; reset at
	     `md:` so desktop keeps its original, non-full-height layout. -->
	<div class="pt-10 md:min-h-0 md:pt-20 md:pb-10">
		<div class="relative">
			<figure
				class="absolute -top-10 right-0 w-50 cursor-pointer md:-top-35 md:-right-50 md:w-1/3 md:w-80"
				onmouseenter={() => {
					profileHovered = true;
				}}
				onmouseleave={() => {
					profileHovered = false;
				}}
			>
				<a href="https://xyz.francescamorini.com"
					><img
						src={profileHovered ? data.about.bio.portrait[0] : data.about.bio.portrait[1]}
						alt="little doodle of a smiling face with curly hair"
						class="mb-4 w-full"
					/>
				</a>
			</figure>
			<h1 class="font-qurdisma relative text-7xl md:text-[120px]">
				{data.about.bio.title}
			</h1>
			<h2 class=" pt-10 md:pt-20 md:text-xl">{data.about.bio.description}</h2>
		</div>
	</div>
	<div class="relative pt-20 pb-10">
		<div>
			<h1 id="projects" class="font-qurdisma mb-8 scroll-mt-28 text-7xl">Projects</h1>
			<div
				bind:this={projectsScroller}
				onscroll={updateActiveCard}
				role="list"
				class="no-scrollbar mr-[calc((100%_-_100vw)/2)] flex h-150 snap-x snap-mandatory gap-4 overflow-x-auto pr-6 md:gap-10 md:pr-100"
			>
				{#each data.projects as project, i (project.slug)}
					<div
						role="listitem"
						data-active={hoveredIndex === null && activeIndex === i}
						onmouseenter={() => (hoveredIndex = i)}
						onmouseleave={() => (hoveredIndex = null)}
						class="group box-shadow hover:shadow-2md data-[active=true]:shadow-2md relative mt-5 h-140 w-80 shrink-0 snap-start overflow-hidden rounded border bg-amber-200 shadow-md transition hover:bg-amber-100 data-[active=true]:bg-amber-100"
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
									class="mb-4 h-72 w-full object-cover mix-blend-luminosity group-hover:mix-blend-normal group-data-[active=true]:mix-blend-normal"
								/>
							{/if}
							<h2 class="px-4 text-xl">
								{project.data.title}
							</h2>
							{#if project.data.description}
								<p class="mt-2 px-4 text-sm">{project.data.description}</p>
							{/if}
							{#if project.data.categories}
								<div class="absolute bottom-0 mb-2 w-full border-t">
									<p class="mt-2 px-4 text-xs">
										{project.data.categories.join(', ')}
									</p>
								</div>
							{/if}
						</a>
					</div>
				{/each}
			</div>
			<!-- Arrow buttons are desktop-only; on mobile the scroller's own
			     `snap-x`/touch-swipe already handles moving between cards. -->
			<div class="mt-6 flex place-content-center gap-3 md:place-content-start">
				<button
					type="button"
					onclick={() => scrollProjects(-1)}
					aria-label="Scroll projects left"
					class="flex h-10 w-20 cursor-pointer items-center justify-center md:w-40"
				>
					<img src="/uploads/icons/r-arrow.svg" alt="" class="w-30 rotate-180" />
				</button>
				<button
					type="button"
					onclick={() => scrollProjects(1)}
					aria-label="Scroll projects right"
					class="flex h-10 w-20 cursor-pointer items-center justify-center md:w-40"
				>
					<img src="/uploads/icons/r-arrow.svg" alt="" class="w-30" />
				</button>
			</div>
		</div>
	</div>
	<div class="grid grid-cols-1 gap-x-6 pb-10 md:grid-cols-2 md:py-10 md:py-20">
		<div class="[&>p>a]:underline">
			<!-- Same `scroll-mt-28` reasoning as the "Projects" heading above. -->
			<h2 id="vitae" class="font-qurdisma my-8 scroll-mt-28 text-7xl">Vitae</h2>
			{@html data.about.html}
		</div>
		<div>
			<h2 class="font-qurdisma my-8 text-7xl">Publications</h2>
			<table class="w-full text-left text-sm">
				<tbody>
					{#each publicationsExpanded ? data.about.publications : data.about.publications.slice(0, 3) as pub (pub.link)}
						<tr class="align-top">
							<td class="pr-4 text-lg">
								<p>
									<span>{pub.authors}</span> <a class="underline" href={pub.link}>{pub.title}</a>
								</p>
								<p class="pt-2 pb-2 text-xs">
									<span>{pub.year}</span> – <span>{pub.publication}</span>
								</p>
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
		<!-- Talks -->
		<div>
			<h2 class="font-qurdisma my-8 text-7xl">Talks</h2>
			<table class="mt-4 w-full text-left text-sm">
				<tbody>
					{#each talksExpanded ? data.about.talks : data.about.talks.slice(0, 3) as talk, t}
						<tr class="align-top">
							<td class="py-2 pr-4 text-lg">
								<p>{talk.title}</p>
								<p class="pt-2 pb-2 text-xs">
									<span>{talk.year}</span> – <span>{talk.place}</span>
								</p>
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
		<!-- Teaching -->
		<div>
			<h2 class="font-qurdisma my-8 text-7xl">Teaching</h2>
			<table class="mt-4 w-full text-left text-sm">
				<tbody>
					{#each teachingExpanded ? data.about.teaching : data.about.teaching.slice(0, 4) as course, c}
						<tr class="align-top">
							<td class="py-2 pr-4 text-lg">
								<p>{course.title}</p>
								<p class="pt-2 pb-2 text-xs">
									<span>{course.year}</span> – <span>{course.place}</span>
								</p>
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
	<div class="w-full pb-10">
		<div class="m-auto w-1/2 md:w-1/6">
			<img src="/uploads/about/about-chicken.png" alt="A doodle of a chicken" />
			<p class="text-sm">Chickens = the best</p>
		</div>
	</div>
</div>
