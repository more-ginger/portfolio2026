<script>
	// Global stylesheet (Tailwind) — imported once here so every route gets it.
	import '../app.css';
	// Reactive current-route info (replaces the old `$app/stores` `page` store).
	import { page } from '$app/state';

	// `children` is the Svelte 5 way of receiving whatever page/route
	// is being rendered inside this layout (equivalent to <slot /> in Svelte 4).
	let { children } = $props();

	// Project detail pages get a white background instead of the site's
	// usual amber, set here since the background lives on this shared
	// layout wrapper rather than in each individual +page.svelte.
	let isProjectPage = $derived(page.url.pathname.startsWith('/projects/'));

	// Menu toggles on click and closes only on a deliberate act: the button
	// again, one of the items, a click outside, or Escape. Moving the cursor
	// away never closes it.
	let menuOpen = $state(false);

	// The whole menu region, so an outside click can be told apart from a
	// click on the button or one of the items.
	/** @type {HTMLElement | null} */
	let menuNav = $state(null);

	// `id: null` means "back to the top" rather than a section to scroll to.
	const sections = [
		{ id: null, label: 'Intro' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'vitae', label: 'Vitae' },
	];

	// Smoothly scrolls to a section by id, or to the very top when `id` is
	// null (used for "Intro"). The three sections only exist on the
	// homepage; `?.` makes this a no-op instead of throwing on other routes.
	/** @param {string | null} id */
	function scrollToSection(id) {
		menuOpen = false;
		if (id === null) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// Runs after the button's own click has already toggled `menuOpen`, so the
	// `!menuOpen` bail-out doubles as the "button just closed it" case and
	// stops this from immediately reopening/closing anything.
	/** @param {MouseEvent} event */
	function handleOutsideClick(event) {
		if (!menuOpen) return;
		if (menuNav && event.target instanceof Node && !menuNav.contains(event.target)) {
			menuOpen = false;
		}
	}

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.key === 'Escape') menuOpen = false;
	}
</script>

<svelte:window onclick={handleOutsideClick} onkeydown={handleKeydown} />

<div
	class="relative w-screen text-red-900"
	class:bg-amber-200={!isProjectPage}
	class:bg-white={isProjectPage}
>
	<!-- Three deliberate layers, and they have to be siblings to work:
	     header background (z-10) < hero doodle (z-20, in +page.svelte) <
	     menu (z-30, below). `position: sticky` always creates a stacking
	     context, so anything left inside this header — whatever z-index it
	     is given — is sealed in with the opaque background and can never
	     rise above the doodle. That's why the menu lives outside it. -->
	<header class="sticky top-0 left-0 z-10 w-screen px-2 py-6">
		<div class="md:m-auto md:grid md:grid-cols-3 md:justify-stretch md:px-10">
			<nav
				class="z-30 m-auto rounded-2xl p-2 md:col-start-2"
				class:bg-amber-200={!isProjectPage}
				class:bg-white={isProjectPage}
			>
				<a href="/" class="w-fit"
					><img
						src="/uploads/about/about-logo.svg"
						class="m-auto w-10 md:w-2/3"
						alt="A small stylized pretzel serving as the logo for the website"
					/></a
				>
			</nav>
		</div>
	</header>

	<!-- Outside <header> by necessity rather than preference (see the layering
	     note above). `fixed` reproduces exactly where it sat as the third grid
	     cell of the sticky header: top-6 matches the header's py-6, right-12
	     its px-2 plus the row's md:px-10. -->
	<nav
		bind:this={menuNav}
		aria-label="Page menu with sections"
		class="fixed top-6 right-12 z-30 hidden md:block"
	>
		<!-- One "active" look (amber fill, red text and border) covers both
		     hover and open, so hovering an already-open button doesn't flip
		     it back to the closed colours. `--menu-bg`/`--menu-fg` hold the
		     current pair and the `hover:`/`data-[open=true]:` rules swap
		     them, so background, text, border and icon all follow along. -->
		<button
			id="menu-button"
			type="button"
			data-open={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
			aria-haspopup="true"
			aria-expanded={menuOpen}
			aria-controls="menu-list"
			class="group flex w-32 cursor-pointer items-center gap-2 rounded-3xl border-2 border-transparent bg-(--menu-bg) py-2 pr-2 pl-6 text-(--menu-fg) transition-colors [--menu-bg:var(--color-red-900)] [--menu-fg:var(--color-amber-200)] hover:border-(--menu-fg) hover:[--menu-bg:var(--color-amber-200)] hover:[--menu-fg:var(--color-red-900)] data-[open=true]:border-(--menu-fg) data-[open=true]:[--menu-bg:var(--color-amber-200)] data-[open=true]:[--menu-fg:var(--color-red-900)]"
		>
			<!-- Three overlapping circles, standing in for the collapsed-menu
			     icon in the reference design. `fill-(--menu-bg)` follows the
			     button's background and `stroke="currentColor"` its text, so
			     the dots invert along with it.

			     Hover/open also fans the dots apart: each shifts 2px further
			     right than the one before it (4 user units, since the 64-unit
			     viewBox renders at 32px — half scale). `overflow-visible`
			     matters here: the last dot lands past the viewBox edge, and
			     an SVG root clips to it by default, slicing the dot in half. -->
			<svg
				viewBox="0 0 64 32"
				class="h-4 w-8 overflow-visible fill-(--menu-bg) transition-colors"
				stroke="currentColor"
				stroke-width="1.5"
				aria-hidden="true"
			>
				<circle cx="10" cy="16" r="14" />
				<circle
					cx="26"
					cy="16"
					r="14"
					class="transition-transform group-hover:[transform:translateX(4px)] group-data-[open=true]:[transform:translateX(4px)]"
				/>
				<circle
					cx="42"
					cy="16"
					r="14"
					class="transition-transform group-hover:[transform:translateX(8px)] group-data-[open=true]:[transform:translateX(8px)]"
				/>
			</svg>
			<span>Menu</span>
		</button>

		{#if menuOpen}
			<!-- `role="menu"`/`menuitem` follows the standard button-triggered
			     menu pattern; `role="none"` on each <li> strips its implicit
			     listitem role so it doesn't clash with that parent/child
			     relationship (a screen reader would otherwise announce
			     "list item" noise around each menu option). -->
			<ul
				id="menu-list"
				role="menu"
				aria-labelledby="menu-button"
				class="absolute top-[calc(100%+1rem)] right-0 flex flex-col gap-4"
			>
				{#each sections as section (section.label)}
					<li role="none">
						<!-- Same inversion as the button, and the same reason for
						     the border: a hovered item is amber on an amber page,
						     so without it the pill's shape would disappear. -->
						<button
							type="button"
							role="menuitem"
							onclick={() => scrollToSection(section.id)}
							class="group flex w-full cursor-pointer items-center gap-3 rounded-full border-2 border-transparent bg-red-900 px-5 py-2 text-amber-200 transition-colors hover:border-red-900 hover:bg-amber-200 hover:text-red-900"
						>
							<span
								class="h-4 w-4 shrink-0 rounded-full border-1 bg-amber-200 transition-colors group-hover:border-red-900 group-hover:bg-amber-200"
							></span>
							{section.label}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</nav>

	<!-- Mobile stand-in for the "Menu" dropdown above (hidden below
			     `md:`, since the two never show at the same time): a fixed
			     pill nav to "Projects"/"Vitae" (no "Intro" — the user is
			     already there, so it'd just be one more thing to tap past).
			     `fixed` means a single instance stays on screen the whole
			     time you scroll, reusing the same `scrollToSection` used by
			     the desktop menu items above. -->
	<div
		class="fixed -bottom-1 left-0 z-50 w-full px-3 md:hidden"
		class:bg-amber-200={!isProjectPage}
		class:bg-white={isProjectPage}
	>
		<div class="flex w-full justify-between justify-items-stretch gap-6 py-6">
			<button
				type="button"
				onclick={() => scrollToSection(null)}
				class="flex cursor-pointer items-center gap-2 rounded-full bg-red-900 px-4 py-2 text-sm text-amber-200"
			>
				<span class="h-3 w-3 shrink-0 rounded-full bg-amber-200"></span>
				Intro
			</button>
			<button
				type="button"
				onclick={() => scrollToSection('projects')}
				class="flex cursor-pointer items-center gap-2 rounded-full bg-red-900 px-4 py-2 text-sm text-amber-200"
			>
				<span class="h-3 w-3 shrink-0 rounded-full bg-amber-200"></span>
				Projects
			</button>
			<button
				type="button"
				onclick={() => scrollToSection('vitae')}
				class="flex cursor-pointer items-center gap-2 rounded-full border-2 border-amber-200 bg-red-900 px-4 py-2 text-sm text-amber-200"
			>
				<span class="h-3 w-3 shrink-0 rounded-full border-2 bg-amber-200"></span>
				Vitae
			</button>
		</div>
	</div>

	<main class="mx-auto max-w-4xl px-6">
		{@render children()}
	</main>
	<footer>
		<nav class="flex justify-between border-t px-6 pt-2 pb-20 md:pb-2">
			<p class="md:text-md text-sm">FM 2026 design + code</p>
			<a class="md:text-md text-sm underline" href="/impressum">Impressum</a>
		</nav>
	</footer>
</div>
