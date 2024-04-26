<script lang="ts">
	import { getArticles } from '$lib';

	const articles = getArticles();
</script>

<svelte:head>
	<title>Gebna blog</title>
	<meta name="description" content="Gebna, GebnaTorky, or Bahaa Zidan" />
</svelte:head>

<div class="flex justify-center">
	<div class="flex flex-col p-4 max-w-[65ch]">
		{#each articles as article, index}
			<a class="link-hover" href={article.path}>
				<div class="text-4xl font-bold">
					{article.title}
				</div>
				<div class="text-lg">{article.publishDate}</div>
			</a>
			{#if index !== articles.length - 1}
				<div class="divider"></div>
			{/if}
		{/each}
	</div>
</div>
