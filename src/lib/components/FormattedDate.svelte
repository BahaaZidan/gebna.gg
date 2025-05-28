<script lang="ts">
	interface Props {
		date: Date;
	}

	const { date }: Props = $props();
</script>

<time datetime={date?.toISOString?.()}>
	{date?.toLocaleDateString?.('en-us', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})}
</time>
