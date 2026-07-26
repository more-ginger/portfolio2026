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

	// Menu opens on click and stays open until the cursor leaves its area
	// (see the `onmouseleave` on the wrapping div below), not on a second click.
	let menuOpen = $state(false);

	// Smoothly scrolls to a section by id, or to the very top when `id` is
	// null (used for "Intro"). The three sections only exist on the
	// homepage; `?.` makes this a no-op instead of throwing on other routes.
	function scrollToSection(id) {
		menuOpen = false;
		if (id === null) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<!-- Fixed: the slight page-wide horizontal scroll was caused by `w-screen`
     (`width: 100vw`) here and on the <header>. 100vw is the full viewport
     width INCLUDING the vertical scrollbar, while the page's actual visible
     area excludes it — so anything sized with `w-screen` was a few pixels
     wider than the screen. Neither div needs it: a block element already
     fills its parent's width on its own. The projects scroller in
     +page.svelte still uses 100vw deliberately (to bleed to the true right
     edge), so its residual overhang is now just clipped via `overflow-x:
     hidden` on <html> in app.css instead of removing the effect. -->
<div
	class="min-h-screen text-red-900"
	class:bg-amber-200={!isProjectPage}
	class:bg-white={isProjectPage}
>
	<header
		class="sticky top-0 z-100 px-2 py-6"
		class:bg-amber-200={!isProjectPage}
		class:bg-white={isProjectPage}
	>
		<div class="m-auto grid grid-cols-3 justify-stretch px-10">
			<nav class="col-start-2 m-auto">
				<a href="/" class="w-fit"><img src="/uploads/about/about-logo.svg" /></a>
			</nav>
			<nav
				aria-label="Page menu with sections"
				class="relative place-self-center justify-self-end"
				style={menuOpen
					? '--menu-bg: var(--color-amber-200); --menu-fg: var(--color-red-900);'
					: '--menu-bg: var(--color-red-900); --menu-fg: var(--color-amber-200);'}
				onmouseleave={() => (menuOpen = false)}
			>
				<!-- The button swaps to an outlined look (amber fill, red border/
				     text) while the menu is open, matching the reference image —
				     both states read the same `--menu-bg`/`--menu-fg` pair above,
				     so the border, text, and icon all flip together automatically. -->
				<button
					id="menu-button"
					type="button"
					onclick={() => (menuOpen = true)}
					aria-haspopup="true"
					aria-expanded={menuOpen}
					aria-controls="menu-list"
					class="flex w-32 cursor-pointer items-center gap-2 rounded-3xl bg-(--menu-bg) py-2 pr-4 pl-3 text-center text-(--menu-fg)"
				>
					<!-- Three overlapping circles, standing in for the collapsed-menu
					     icon in the reference design. `stroke="currentColor"` follows
					     the button's text color; `fill-(--menu-bg)` follows its
					     background the same way, so the circles always blend into
					     whichever state the button is in. -->
					<svg
						viewBox="0 0 64 32"
						class="h-4 w-8 fill-(--menu-bg)"
						stroke="currentColor"
						stroke-width="1.5"
						aria-hidden="true"
					>
						<circle cx="16" cy="16" r="14" />
						<circle cx="32" cy="16" r="14" />
						<circle cx="48" cy="16" r="14" />
					</svg>
					Menu
				</button>

				{#if menuOpen}
					<!-- Transparent bridge: fills the gap between the button and the
					     first menu item below it, so moving the mouse diagonally
					     between them stays inside this wrapper's hover area instead
					     of triggering `onmouseleave` and closing the menu early. -->
					<div class="absolute top-full right-0 h-4 w-full"></div>

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
						<li role="none">
							<button
								type="button"
								role="menuitem"
								onclick={() => scrollToSection(null)}
								class="flex w-full cursor-pointer items-center gap-3 rounded-full bg-red-900 px-5 py-3 text-amber-200"
							>
								<span class="h-4 w-4 shrink-0 rounded-full bg-amber-200"></span>
								Intro
							</button>
						</li>
						<li role="none">
							<button
								type="button"
								role="menuitem"
								onclick={() => scrollToSection('projects')}
								class="flex w-full cursor-pointer items-center gap-3 rounded-full bg-red-900 px-5 py-3 text-amber-200"
							>
								<span class="h-4 w-4 shrink-0 rounded-full bg-amber-200"></span>
								Projects
							</button>
						</li>
						<li role="none">
							<button
								type="button"
								role="menuitem"
								onclick={() => scrollToSection('vitae')}
								class="flex w-full cursor-pointer items-center gap-3 rounded-full bg-red-900 px-5 py-3 text-amber-200"
							>
								<span class="h-4 w-4 shrink-0 rounded-full bg-amber-200"></span>
								Vitae
							</button>
						</li>
					</ul>
				{/if}
			</nav>
		</div>
	</header>

	<main class="mx-auto max-w-4xl px-6">
		{@render children()}
	</main>
	<footer>
		<nav class="flex justify-between px-6 py-8">
			<p>FM 2026 design + code</p>
			<a>Impressum</a>
		</nav>
	</footer>
</div>
