import matter from 'gray-matter';
import * as v from 'valibot';

import { BASE_URL } from './constants';

export const CONTENT_BASE_PATH = '/src/content/blog';

export const blogPosts = import.meta.glob('/src/content/blog/*.mdx', {
	query: '?raw',
	import: 'default',
	eager: true,
});

export const blogPostMetadataSchema = v.object({
	id: v.pipe(v.string(), v.trim()),
	title: v.pipe(v.string(), v.trim()),
	description: v.pipe(v.string(), v.trim()),
	pubDate: v.pipe(
		v.string(),
		v.transform((i) => new Date(i)),
		v.date()
	),
	lastMod: v.optional(
		v.pipe(
			v.string(),
			v.transform((i) => new Date(i)),
			v.date()
		)
	),
});

export function getMetadataFromMatter(
	id: string,
	data: {
		[key: string]: unknown;
	}
) {
	const post = v.parse(blogPostMetadataSchema, {
		id,
		...data,
	});
	const canonicalURL = new URL(`/blog/${post.id}`, BASE_URL).toString();
	const relativeURL = `/blog/${post.id}`;
	const ogImage = `/content/${post.id}/og.jpg`;
	const heroImage = `/content/${post.id}/hero.webp`;

	return { ...post, canonicalURL, relativeURL, ogImage, heroImage };
}

export function getBlogPostsMetadata() {
	const posts = Object.entries(blogPosts)
		.map(([filePath, rawContent]) => {
			const { data } = matter(rawContent);
			const id = filePath
				.split('/')
				.pop()
				?.replace(/\.mdx$/, '') as string;

			return getMetadataFromMatter(id, data);
		})
		.sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

	return posts;
}
