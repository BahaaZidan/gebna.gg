import { XMLBuilder } from 'fast-xml-parser';

import { BASE_URL, DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '$lib/constants';
import { getBlogPostsMetadata } from '$lib/content';

import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const posts = getBlogPostsMetadata().slice(0, 15);

	const rssObject = {
		rss: {
			'@_version': '2.0',
			'@_xmlns:atom': 'http://www.w3.org/2005/Atom',
			channel: {
				title: DEFAULT_TITLE,
				link: BASE_URL,
				description: DEFAULT_DESCRIPTION,
				language: 'en-us',
				pubDate: new Date().toUTCString(),
				'atom:link': {
					'@_href': `${BASE_URL}rss.xml`,
					'@_rel': 'self',
					'@_type': 'application/rss+xml',
				},
				item: posts.map((post) => ({
					title: post.title,
					link: post.canonicalURL,
					guid: post.canonicalURL,
					description: post.description,
					pubDate: post.pubDate.toUTCString(),
					'dc:date': post.lastMod?.toISOString(),
				})),
			},
		},
	};

	const builder = new XMLBuilder({
		ignoreAttributes: false,
		format: true,
	});

	const rssXml = builder.build(rssObject);

	return new Response(rssXml, {
		headers: {
			'Content-Type': 'application/xml',
		},
	});
};
