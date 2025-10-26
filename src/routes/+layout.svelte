<script lang="ts">
	import '../app.css';

	import LinkedinIcon from '@lucide/svelte/icons/linkedin';
	import MailIcon from '@lucide/svelte/icons/mail';
	import RssIcon from '@lucide/svelte/icons/rss';
	import { siBluesky, siGithub, siInstagram, siX, siYoutube } from 'simple-icons';

	import { resolve } from '$app/paths';

	import BrandIcon from '$lib/components/BrandIcon.svelte';
	import Search from '$lib/components/Search.svelte';

	let { children } = $props();
	const iconClass = 'transition-all duration-300 ease-in-out hover:text-gray-900';
</script>

<header class="flex w-full justify-center">
	<div class="flex w-full max-w-7xl justify-between p-4">
		<a class="btn btn-ghost text-xl" href={resolve('/')}>
			<img src="/avatar.jpeg" class="size-9 rounded-full" alt="my avatar" />
			Bahaa Zidan
		</a>
		<Search />
	</div>
</header>

{@render children()}

<footer class="bg-neutral mt-auto flex w-full justify-center">
	<div class="footer sm:footer-horizontal text-neutral-content w-full max-w-7xl items-center p-4">
		<aside class="grid-flow-col items-center">
			<p>Thank you for reading!</p>
		</aside>
		<nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
			<a
				href={resolve('/rss.xml')}
				target="_blank"
				aria-label="RSS"
				data-umami-event="Follow"
				data-umami-event-target="RSS"
			>
				<RssIcon class={iconClass} />
			</a>
			<a
				href="mailto:gebnatorky@gmail.com"
				aria-label="Email"
				data-umami-event="Follow"
				data-umami-event-target="Email"
			>
				<MailIcon class={iconClass} />
			</a>
			<a
				href="https://github.com/BahaaZidan"
				target="_blank"
				rel="nofollow"
				aria-label="GitHub"
				data-umami-event="Follow"
				data-umami-event-target="GitHub"
			>
				<BrandIcon icon={siGithub} class={iconClass} />
			</a>
			<a
				href="https://youtube.com/@GebnaTorky"
				target="_blank"
				rel="nofollow"
				aria-label="Youtube"
				data-umami-event="Follow"
				data-umami-event-target="Youtube"
			>
				<BrandIcon icon={siYoutube} class={iconClass} />
			</a>
			<a
				href="https://www.instagram.com/gebnatorky/"
				target="_blank"
				rel="nofollow"
				aria-label="Instagram"
				data-umami-event="Follow"
				data-umami-event-target="Instagram"
			>
				<BrandIcon icon={siInstagram} class={iconClass} />
			</a>
			<a
				href="https://www.linkedin.com/in/bahaazidan/"
				target="_blank"
				rel="nofollow"
				aria-label="LinkedIn"
				data-umami-event="Follow"
				data-umami-event-target="LinkedIn"
			>
				<LinkedinIcon class={iconClass} />
			</a>
			<a
				href="https://x.com/GebnaTorky"
				target="_blank"
				rel="nofollow"
				aria-label="Twitter"
				data-umami-event="Follow"
				data-umami-event-target="Twitter"
			>
				<BrandIcon icon={siX} class={iconClass} />
			</a>
			<a
				href="https://bsky.app/profile/gebna.gg"
				target="_blank"
				rel="nofollow"
				aria-label="Bluesky"
				data-umami-event="Follow"
				data-umami-event-target="Bluesky"
			>
				<BrandIcon icon={siBluesky} class={iconClass} />
			</a>
		</nav>
	</div>
</footer>
