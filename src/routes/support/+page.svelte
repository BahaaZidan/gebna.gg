<script lang="ts">
	const coins = [
		{
			label: 'BTC',
			protocol: 'bitcoin',
			address: '1HE19KwKcSHHS2cxmVC6igoV1xrKKEhwmD'
		},
		{
			label: 'ETH',
			protocol: 'ethereum',
			address: '0xCDe1A477831A7DBa01E122f90A04cd2372F703A8'
		},
		{
			label: 'XMR',
			protocol: 'monero',
			address:
				'47qCDWTJErLcxi3kSPJfMwb7A9R84PNLXddg2uc6ntpx9w145y9HemZBa57Tcno3oyPoHvADbqGKS3gd9SFzyfwg9BYzskL'
		}
	];
</script>

<div class="p-4 flex flex-col gap-3">
	<h2 class="text-2xl font-bold">Fiat</h2>
	<iframe
		id="kofiframe"
		src="https://ko-fi.com/gebna/?hidefeed=true&widget=true&embed=true&preview=true"
		class="w-full sm:w-[25rem] h-[712px] mx-auto"
		title="gebna"
	></iframe>
	<h2 class="text-2xl font-bold">Crypto</h2>
	<ul class="flex flex-col gap-3">
		{#each coins as coin}
			<li>
				<span>{coin.label}: </span>
				<a class="break-words link" target="_new" href="{coin.protocol}:{coin.address}"
					>{coin.address}</a
				>
			</li>
		{/each}
	</ul>
</div>
