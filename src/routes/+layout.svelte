<script>
	// Global stylesheet (Tailwind) — imported once here so every route gets it.
	import '../app.css';

	// `children` is the Svelte 5 way of receiving whatever page/route
	// is being rendered inside this layout (equivalent to <slot /> in Svelte 4).
	let { children } = $props();
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
<div class="min-h-screen bg-amber-200 text-red-900">
	<header class="sticky top-0 z-100 bg-amber-200 py-6">
		<nav class="m-auto w-fit">
			<a href="/" class=" font-semibold"><img src="/uploads/about/about-logo.svg" /></a>
		</nav>
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
