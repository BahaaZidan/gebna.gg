<script lang="ts">
	import SearchIcon from '@lucide/svelte/icons/search';
	import XIcon from '@lucide/svelte/icons/x';
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

	let dialog: HTMLDialogElement;
	let input: HTMLInputElement;

	function showAndFocus() {
		dialog.showModal();
		setTimeout(() => {
			input.value = '';
			input.focus();
		}, 50);
	}
</script>

<svelte:document
	onkeypress={(e) => {
		if (e.key === '/') {
			showAndFocus();
		}
	}}
/>

<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="input hover:cursor-text" role="button" onclick={showAndFocus}>
	<SearchIcon />
	<div class="grow">Search</div>
	<kbd class="kbd">/</kbd>
</div>
<dialog bind:this={dialog} class="modal">
	<div class="modal-box h-144 w-88 md:w-xl">
		<div class="flex flex-col gap-4">
			<div class="join">
				<input
					type="text"
					placeholder="Search..."
					class="input-bordered input input-lg join-item grow"
					bind:value={searchValue}
					bind:this={input}
				/>
				<form method="dialog">
					<button class="btn join-item btn-lg"><XIcon /></button>
				</form>
			</div>

			{#await searchResults}
				<div>loading...</div>
			{:then results}
				{#each results as result (result.url)}
					<div class="flex flex-col gap-1 rounded-lg bg-base-300 p-4">
						<a
							data-sveltekit-reload
							href={result.url.replace('.html', '')}
							class="text-sm font-bold wrap-anywhere link-hover"
						>
							{result.meta.title}
						</a>
						<div class="text-xs">{@html result.excerpt}</div>
					</div>
				{/each}
			{/await}
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
