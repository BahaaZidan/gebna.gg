<script>
	/** @type {string}*/
	export let title;
	/** @type {string}*/
	export let date;
</script>

<article class="prose prose-lg p-4">
	<h1>{title}</h1>
	<h3>{date}</h3>
	<div class="divider"></div>
	<slot></slot>
</article>
