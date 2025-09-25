<script lang="ts">
	import type { Post } from '$lib/content';

	import FormattedDate from './FormattedDate.svelte';

	interface Props {
		post: Post;
	}

	let { post }: Props = $props();
</script>

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
