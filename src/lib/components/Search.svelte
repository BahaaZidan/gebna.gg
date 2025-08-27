<script lang="ts">
	import SearchIcon from '@lucide/svelte/icons/search';
	import { onMount } from 'svelte';
	// TODO: figure out a way to use the types directly from pagefind. we're not using this vite-plugin anyway
	import type { Pagefind } from 'vite-plugin-pagefind/types';

	import { importWithoutVite } from '$lib/util';

	let pagefind: Pagefind;

	onMount(async () => {
		pagefind = await importWithoutVite('/pagefind/pagefind.js');
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

<div class="drawer w-28">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<label for="my-drawer" class="btn drawer-button">
			<SearchIcon />
			Search
		</label>
	</div>
	<div class="drawer-side">
		<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu bg-base-200 text-base-content min-h-full w-80 gap-2 p-4">
			<div class="revert-all">
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
			</div>
		</ul>
	</div>
</div>
