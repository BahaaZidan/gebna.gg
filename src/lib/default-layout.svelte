<script>
	/** @type {string}*/
	export let title;
	/** @type {string}*/
	export let date;
</script>

<article class="prose prose-lg p-4">
	{#if title}
		<h1>{title}</h1>
	{/if}
	{#if title || date}
		<h4>Written by <a href="/whoami">Bahaa Zidan</a></h4>
	{/if}
	{#if date}
		<h4>{date}</h4>
	{/if}
	{#if title || date}
		<div class="divider"></div>
	{/if}
	<slot></slot>
</article>
