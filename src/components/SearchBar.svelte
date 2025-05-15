<script lang="ts">
  import { onMount } from "svelte";

  let pagefind: any;

  onMount(async () => {
    pagefind = await import(
      /* @vite-ignore */
      `${import.meta.env.BASE_URL}pagefind/pagefind.js`
    );
    pagefind.init();
  });

  async function fetchSearchResults(val: string) {
    const search = await pagefind?.debouncedSearch(val);

    if (search?.results?.length > 0) {
      const results = search.results;
      const data = await Promise.all(
        results.map(async (r: any) => await r.data()),
      );
      return data;
    }
    return [];
  }

  let searchValue = $state("");
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
    {#each results as result}
      <div class="flex flex-col gap-1">
        <a href={result.url} class="link-hover text-sm font-bold">
          {result.meta.title}
        </a>
        <div class="text-xs">{@html result.excerpt}</div>
      </div>
    {/each}
  {/await}
</div>
