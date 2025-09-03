<script lang="ts">
	import CoffeeIcon from '@lucide/svelte/icons/coffee';
	import LinkIcon from '@lucide/svelte/icons/link';
	import LinkedinIcon from '@lucide/svelte/icons/linkedin';
	import ShareIcon from '@lucide/svelte/icons/share';
	import { siBluesky, siReddit, siX, siYcombinator } from 'simple-icons';

	import BrandIcon from '$lib/components/BrandIcon.svelte';
	import FormattedDate from '$lib/components/FormattedDate.svelte';
	import Head from '$lib/components/Head.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Head
	title={data.title}
	description={data.description}
	pathname={data.relativeURL}
	imagePath={data.ogImage}
/>
<svelte:head>
	<meta property="article:published_time" content={data.pubDate.toISOString()} />
	<meta name="last-modified" content={(data.lastMod || data.pubDate).toISOString()} />
	<meta property="article:modified_time" content={(data.lastMod || data.pubDate).toISOString()} />
</svelte:head>

<main data-pagefind-body>
	<article class="prose prose-lg mx-auto p-4">
		<div class="flex flex-col items-center">
			<h1 class="wrap-anywhere">
				{data.title}
			</h1>
			<span>
				Published on <b><FormattedDate date={data.pubDate} /></b>
			</span>
			{#if data.lastMod}
				<span>
					Updated on <b><FormattedDate date={data.lastMod} /></b>
				</span>
			{/if}
			<img
				alt="{data.title} hero image"
				src={`/content/${data.id}/hero.webp`}
				class="max-h-96 w-full max-w-2xl object-cover"
			/>
		</div>
		<div class="divider"></div>

		{@html data.contentHTML}

		<div data-pagefind-ignore class="not-prose flex w-full justify-between">
			<div class="dropdown dropdown-top">
				<div tabindex="0" role="button" class="btn btn-primary">
					<ShareIcon /> Share
				</div>

				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<ul
					tabindex="0"
					class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
				>
					<li>
						<button
							onclick={() => {
								navigator.clipboard.writeText(data.canonicalURL);
								// @ts-expect-error we need this until popover positioning works on ff/safari
								document.activeElement?.blur?.();
							}}
							data-umami-event="Share"
							data-umami-event-target="Copy Link"
						>
							<LinkIcon />
							Copy Link
						</button>
					</li>
					<div class="divider m-0"></div>
					<li>
						<a
							href={`https://www.reddit.com/submit?url=${data.canonicalURL}&type=LINK&title=${data.title}`}
							target="_blank"
							rel="noreferrer noopener"
							data-umami-event="Share"
							data-umami-event-target="Reddit"
						>
							<BrandIcon icon={siReddit} />
							Reddit
						</a>
					</li>
					<li>
						<a
							href={`https://news.ycombinator.com/submitlink?u=${data.canonicalURL}&t=${data.title}`}
							target="_blank"
							rel="noreferrer noopener"
							data-umami-event="Share"
							data-umami-event-target="Hacker News"
						>
							<BrandIcon icon={siYcombinator} />
							Hacker News
						</a>
					</li>
					<li>
						<a
							href={`https://bsky.app/intent/compose?text=${data.title} by @gebna.gg ${data.canonicalURL}`}
							target="_blank"
							rel="noreferrer noopener"
							data-umami-event="Share"
							data-umami-event-target="Bluesky"
						>
							<BrandIcon icon={siBluesky} />
							Bluesky
						</a>
					</li>
					<li>
						<a
							href={`https://twitter.com/intent/tweet?text=${data.title} by @GebnaTorky&url=${data.canonicalURL}`}
							target="_blank"
							rel="noreferrer noopener"
							data-umami-event="Share"
							data-umami-event-target="Twitter"
						>
							<BrandIcon icon={siX} />
							Twitter
						</a>
					</li>
					<li>
						<a
							href={`https://www.linkedin.com/shareArticle?mini=true&url=${data.canonicalURL}`}
							target="_blank"
							rel="noreferrer noopener"
							data-umami-event="Share"
							data-umami-event-target="LinkedIn"
						>
							<LinkedinIcon />
							LinkedIn
						</a>
					</li>
				</ul>
			</div>
			<a class="btn btn-secondary" href="/support" target="_blank" data-umami-event="Coffee Link">
				<CoffeeIcon /> Buy me a coffee
			</a>
		</div>
	</article>
</main>
