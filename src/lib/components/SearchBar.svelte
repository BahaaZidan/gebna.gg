<script lang="ts">
	import { onMount } from 'svelte';
	// TODO: figure out a way to use the types directly from pagefind. we're not using this vite-plugin anyway
	import type { Pagefind } from 'vite-plugin-pagefind/types';

	let pagefind: Pagefind;

	onMount(async () => {
		pagefind = await import(
			// WORKAROUND: we need this templating trick to stop vite from statically analyzing this import
			/* @vite-ignore */
			`${'/'}pagefind/pagefind.js`
		);
		pagefind.init();
	});

	async function fetchSearchResults(val: string) {
		const search = await pagefind?.debouncedSearch(val);

		if (search?.results?.length > 0) {
			const results = search.results;
			const data = await Promise.all(results.map(async (r) => await r.data()));
			return data;
		}
		return [];
	}

	let searchValue = $state('');
	let searchResults = $derived(fetchSearchResults(searchValue));
</script>

<div class="flex max-w-80 flex-col gap-6">
	<input
		type="text"
		placeholder="search"
		class="input input-bordered input-lg"
		bind:value={searchValue}
	/>

	{#await searchResults}
		<div>loading...</div>
	{:then results}
		{#each results as result (result.url)}
			<div class="flex flex-col gap-1">
				<a
					href={result.url.replace('.html', '')}
					class="link-hover text-sm font-bold wrap-anywhere"
				>
					{result.meta.title}
				</a>
				<div class="text-xs">{@html result.excerpt}</div>
			</div>
		{/each}
	{/await}
</div>
