<script>
	import slugify from 'slugify';

	/** @type {string}*/
	export let title;
	/** @type {string}*/
	export let description;
	/** @type {string}*/
	export let date;
	/** @type {string}*/
	export let image;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={image} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:creator" content="@GebnaTorky" />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:image" content={image} />
</svelte:head>

<article class="prose prose-lg p-4 mx-auto">
	<h1 style:--articleTitle="title_{slugify(title, { strict: true, lower: true })}">{title}</h1>
	<h4>Written by <a href="/whoami">Bahaa Zidan</a></h4>
	<h4>{date}</h4>
	<div class="divider"></div>
	<slot></slot>
</article>

<div class="hero">
	<div class="hero-content text-center">
		<div class="max-w-md flex flex-col gap-2">
			<h1 class="text-2xl font-bold">Thank you for reading!</h1>
			<ul>
				<li>
					For any questions or comments, feel free to <a href="/whoami" class="link">contact me</a>
				</li>
				<li>
					Add <a href="/rss.xml" class="link">my blog's rss</a>
					to your feed
				</li>
				<li><a href="/support" class="link">Buy me a coffee</a></li>
			</ul>
			<p>
				You're not obligated to do any of that. I wholeheartedly appreciate you taking the time to
				read my work.
			</p>
			<p>🍉</p>
		</div>
	</div>
</div>

<style>
	article {
		& h1 {
			view-transition-name: var(--articleTitle);
		}
	}
</style>
