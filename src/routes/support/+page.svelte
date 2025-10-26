<script lang="ts">
	import Head from '$lib/components/Head.svelte';

	const coins = [
		{
			label: 'BTC',
			protocol: 'bitcoin',
			address: '1HE19KwKcSHHS2cxmVC6igoV1xrKKEhwmD',
		},
		{
			label: 'ETH',
			protocol: 'ethereum',
			address: '0xCDe1A477831A7DBa01E122f90A04cd2372F703A8',
		},
		{
			label: 'XMR',
			protocol: 'monero',
			address:
				'47qCDWTJErLcxi3kSPJfMwb7A9R84PNLXddg2uc6ntpx9w145y9HemZBa57Tcno3oyPoHvADbqGKS3gd9SFzyfwg9BYzskL',
		},
	];
</script>

<Head
	title="Support me"
	description="Support my writing and knowledge sharing."
	pathname="/support"
/>

<main class="flex flex-col gap-3 p-4">
	<iframe
		id="kofiframe"
		src="https://ko-fi.com/gebna/?hidefeed=true&widget=true&embed=true&preview=true"
		class="mx-auto h-[665px] w-full sm:w-100"
		title="gebna"
	></iframe>
	<h2 class="text-2xl font-bold">Crypto addresses</h2>
	<ul class="flex flex-col gap-3">
		{#each coins as coin (coin.protocol)}
			<li>
				<span>{coin.label}:</span>
				<a class="link wrap-break-word" href="{coin.protocol}:{coin.address}">
					{coin.address}
				</a>
			</li>
		{/each}
	</ul>
</main>
