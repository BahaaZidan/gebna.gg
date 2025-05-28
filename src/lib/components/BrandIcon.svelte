<script lang="ts">
	import type { SimpleIcon } from 'simple-icons';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		icon: SimpleIcon;
		size?: number;
		color?: string;
		class?: ClassValue;
	}

	let { icon, size = 24, color = 'currentColor', class: class_ }: Props = $props();
</script>

<svg
	role="img"
	fill={color ?? `#${icon.hex}`}
	width={size}
	height={size}
	viewBox="0 0 24 24"
	class={class_}
>
	<title>{icon.title}</title>
	<path d={icon.path} />
</svg>
