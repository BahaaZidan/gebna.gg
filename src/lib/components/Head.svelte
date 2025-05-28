<script lang="ts">
	import { BASE_URL } from '$lib/constants';

	interface Props {
		title: string;
		description: string;
		pathname: string;
		imagePath?: string;
	}

	let { title, description, pathname, imagePath }: Props = $props();

	const canonicalURL = new URL(pathname, BASE_URL).toString();
	// TODO: consider a fallback image
	const imageURL = imagePath && new URL(imagePath, BASE_URL).toString();
</script>

<svelte:head>
	<link rel="canonical" href={canonicalURL} />

	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalURL} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageURL} />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={canonicalURL} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={imageURL} />
</svelte:head>
