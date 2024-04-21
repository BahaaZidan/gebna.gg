<script lang="ts">
	export let title: string;
	export let date: string;
	export let data;
	export let form;
</script>

<article class="prose prose-lg p-4">
	<h1>{title}</h1>
	<h3>{date}</h3>
	<div class="divider"></div>
	<slot></slot>
</article>
