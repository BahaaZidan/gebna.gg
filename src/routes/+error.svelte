<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<div class="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
	<div class="text-center">
		<h1 class="text-9xl font-bold text-primary">404</h1>
		<p class="mt-6 text-2xl font-semibold md:text-3xl">Page Not Found</p>
		<p class="mt-4 mb-8 text-base-content">Sorry, the page you're looking for doesn't exist.</p>
		<a href={resolve('/')} class="btn btn-primary">Go Home</a>
	</div>
</div>
