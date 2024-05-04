<script lang="ts">
	import '../app.css';
	import '$lib/prism-vsc-dark-plus.css';

	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	onNavigate((navigation) => {
		// @ts-ignore
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			// @ts-ignore
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="canonical" href={$page.url.toString()} />
</svelte:head>

<div class="navbar bg-base-100 font-mono px-4 gap-2">
	<a class="btn btn-primary text-lg" href="/">gebna.gg</a>
	<a class="btn btn-ghost text-lg" href="/whoami">contact me</a>
	<a class="btn btn-ghost text-lg" href="/rss.xml">rss</a>
</div>

<slot />
