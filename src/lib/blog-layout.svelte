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

<div class="flex justify-center">
	<article class="prose prose-lg p-4">
		<h1>{title}</h1>
		<h4>Written by <a href="/whoami">Bahaa Zidan</a></h4>
		<h4>{date}</h4>
		<div class="divider"></div>
		<slot></slot>
	</article>
</div>
