<script lang="ts">
	import FormattedDate from '$lib/components/FormattedDate.svelte';
	import Head from '$lib/components/Head.svelte';
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

<main class="flex justify-center">
	<section class="my-4 flex max-w-7xl flex-wrap justify-center gap-4">
		{#each data.posts as post (post.id)}
			<a class="card bg-base-100 group w-sm shadow-sm" href={post.relativeURL}>
				<figure>
					<img
						class="h-64 w-sm scale-100 object-cover duration-100 ease-in group-hover:scale-105"
						src={post.heroImage}
						alt={post.title}
					/>
				</figure>
				<div class="card-body">
					<FormattedDate date={post.pubDate} />
					<h2 class="card-title wrap-anywhere">{post.title}</h2>
				</div>
			</a>
		{/each}
	</section>
</main>
