<script lang="ts">
	import LinkIcon from '@lucide/svelte/icons/link';
	import LinkedinIcon from '@lucide/svelte/icons/linkedin';
	import ShareIcon from '@lucide/svelte/icons/share';
	import { siBluesky, siReddit, siX, siYcombinator } from 'simple-icons';

	import { resolve } from '$app/paths';

	import BrandIcon from '$lib/components/BrandIcon.svelte';
	import FormattedDate from '$lib/components/FormattedDate.svelte';
	import Head from '$lib/components/Head.svelte';
	import PostCard from '$lib/components/PostCard.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const ctas: Array<[text: string, linkLabel: string]> = [
		['If you’re building something similar and want a hand,', 'reach out'],
		['If you want me to help you ship this kind of work,', 'let’s chat'],
		['If you’re hiring and this is the kind of thinking you want,', 'talk to me'],
		['If you’re looking for someone to own the gnarly parts,', 'I’m available'],
		['If you want to move faster without breaking things,', 'let’s talk'],
		['If you’re scaling and need help untangling complexity,', 'reach out'],
		['If you want help turning an idea into a shipped product,', 'let’s work together'],
		['If you’re looking for a senior engineer to jump in and deliver,', 'hire me'],
		['If this post was useful and you want help applying it,', 'message me'],
		['If you want me to review your plan or code before you commit,', 'send it over'],
		['If you’re building on Cloudflare/Workers and want guidance,', 'let’s chat'],
		['If you want a practical code/architecture review,', 'book a quick call'],
		['If you want ongoing help on a product team,', 'let’s connect'],
		['If you’re trying to make your app faster and more reliable,', 'I can help'],
		['If you want to collaborate on something interesting,', 'say hi'],
	];
	const [ctaText, ctaLink] = ctas[Math.floor(Math.random() * ctas.length)];
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
	<article class="mx-auto prose prose-lg p-4">
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
			<div class="flex gap-2">
				{#each data.tags as tag (tag)}
					<a href={resolve('/blog/tag/[tag]', { tag })} class="link-hover">#{tag}</a>
				{/each}
			</div>
		</div>
		<div class="divider"></div>

		{@html data.contentHTML}

		<div data-pagefind-ignore class="not-prose flex w-full flex-col gap-2">
			<p>
				{ctaText}
				<a class="link" href="mailto:gebnatorky@gmail.com">{ctaLink}</a>
			</p>
			<div class="dropdown dropdown-top">
				<div tabindex="0" role="button" class="btn btn-primary">
					<ShareIcon /> Share
				</div>

				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<ul
					tabindex="0"
					class="dropdown-content menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm"
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
		</div>
	</article>
	<section data-pagefind-ignore class="mb-4 flex w-full justify-center p-2">
		<div class="flex w-full max-w-216 flex-col items-center gap-2">
			<div class="divider">Related Articles</div>
			<div class="flex w-full flex-wrap justify-center gap-4">
				{#each data.recommendations as rec (rec.id)}
					<PostCard post={rec} />
				{/each}
			</div>
		</div>
	</section>
</main>
