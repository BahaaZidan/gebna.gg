<script lang="ts">
	export let title: string;
	export let date: string;
</script>

<article class="prose">
	<h1>{title}</h1>
	<h3>{date}</h3>
	<div class="divider"></div>
	<slot></slot>
</article>
