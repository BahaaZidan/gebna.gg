<script lang="ts">
	import FunnelIcon from '@lucide/svelte/icons/funnel';
	import XIcon from '@lucide/svelte/icons/x';

	import Head from '$lib/components/Head.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '$lib/constants';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let dialog: HTMLDialogElement;
</script>

<Head
	title={DEFAULT_TITLE}
	description={DEFAULT_DESCRIPTION}
	pathname="/"
	imagePath="/avatar.jpeg"
/>

<main class="flex flex-col items-center">
	<button class="btn" onclick={() => dialog.showModal()}>
		<FunnelIcon />
		Filter
	</button>
	<dialog bind:this={dialog} class="modal">
		<div class="modal-box h-[36rem] w-[22rem] md:w-xl">
			<div class="flex flex-col items-end">
				<form method="dialog">
					<button class="btn btn-lg join-item rounded-full"><XIcon /></button>
				</form>
				<div class="flex max-w-7xl flex-wrap gap-2 px-4">
					{#each data.tags as tag (tag)}
						<a class="link-hover badge badge-secondary" href="/blog/tag/{tag}">#{tag}</a>
					{/each}
				</div>
			</div>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>

	<section class="my-4 flex max-w-7xl flex-wrap justify-center gap-4">
		{#each data.posts as post (post.id)}
			<PostCard {post} />
		{/each}
	</section>
</main>
