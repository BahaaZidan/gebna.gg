<script>
	/** @type {string}*/
	export let title;
	/** @type {string}*/
	export let description;
	/** @type {string}*/
	export let date;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="prose prose-lg p-4">
	<slot></slot>
</div>
