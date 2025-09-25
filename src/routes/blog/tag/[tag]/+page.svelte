<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import { DEFAULT_DESCRIPTION } from '$lib/constants';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Head
	title="#{data.tag}"
	description={DEFAULT_DESCRIPTION}
	pathname="/blog/tag/{data.tag}"
	imagePath="/avatar.jpeg"
/>

<main class="flex flex-col items-center">
	<h1 class="text-4xl">#{data.tag}</h1>
	<section class="my-4 flex max-w-7xl flex-wrap justify-center gap-4">
		{#each data.posts as post (post.id)}
			<PostCard {post} />
		{/each}
	</section>
</main>
