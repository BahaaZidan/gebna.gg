<script lang="ts">
	const glob_import = import.meta.glob<{ metadata: Record<string, any> }>('./blog/**/*.svx', {
		eager: true
	});
	const articles = Array.from(Object.entries(glob_import))
		.map((x) => ({
			path: x[0].replace('/+page.svx', '').replace('./', '/'),
			publishDate: x[1].metadata.date,
			title: x[1].metadata.title
		}))
		.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
</script>

<svelte:head>
	<title>Gebna blog</title>
	<meta name="description" content="Gebna, GebnaTorky, or Bahaa Zidan" />
</svelte:head>

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
