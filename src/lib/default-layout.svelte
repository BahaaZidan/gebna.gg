<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		description: string;
		children: Snippet;
	};

	let { title, description, children }: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="prose prose-lg p-4">
	{@render children()}
</div>
