import { XMLBuilder } from 'fast-xml-parser';

import { BASE_URL } from '$lib/constants';
import { getBlogPostsMetadata } from '$lib/content';

import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const posts = getBlogPostsMetadata();
	const sitemapObject = {
		urlset: {
			'@_xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
			'@_xmlns:xhtml': 'https://www.w3.org/1999/xhtml',
			'@_xmlns:mobile': 'https://www.google.com/schemas/sitemap-mobile/1.0',
			'@_xmlns:news': 'https://www.google.com/schemas/sitemap-news/0.9',
			'@_xmlns:image': 'https://www.google.com/schemas/sitemap-image/1.1',
			'@_xmlns:video': 'https://www.google.com/schemas/sitemap-video/1.1',
			url: [
				{ loc: BASE_URL, lastmod: new Date() },
				{ loc: `${BASE_URL}support`, lastmod: new Date() },
			].concat(
				posts.map((post) => ({
					loc: post.canonicalURL,
					lastmod: post.pubDate,
				}))
			),
		},
	};

	const builder = new XMLBuilder({
		ignoreAttributes: false,
		format: true,
	});

	const sitemapXml = builder.build(sitemapObject);

	return new Response(sitemapXml, {
		headers: {
			'Content-Type': 'application/xml',
		},
	});
};
