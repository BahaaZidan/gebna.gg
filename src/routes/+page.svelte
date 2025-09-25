<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '$lib/constants';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Head
	title={DEFAULT_TITLE}
	description={DEFAULT_DESCRIPTION}
	pathname="/"
	imagePath="/avatar.jpeg"
/>

<main class="flex flex-col items-center">
	<div class="flex max-w-7xl flex-wrap gap-2 px-4">
		{#each data.tags as tag (tag)}
			<a class="link-hover badge" href="/blog/tag/{tag}">#{tag}</a>
		{/each}
	</div>
	<section class="my-4 flex max-w-7xl flex-wrap justify-center gap-4">
		{#each data.posts as post (post.id)}
			<PostCard {post} />
		{/each}
	</section>
</main>
