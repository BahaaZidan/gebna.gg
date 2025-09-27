import { transformerCopyButton } from '@rehype-pretty/transformers';
import { error } from '@sveltejs/kit';
import matter from 'gray-matter';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import {
	blogPosts,
	CONTENT_BASE_PATH,
	getBlogPostsMetadata,
	getMetadataFromMatter,
	type Post,
} from '$lib/content';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const matchPath = `${CONTENT_BASE_PATH}/${params.id}.mdx`;
	const rawContent = blogPosts[matchPath];
	if (!rawContent) return error(404);

	const { content, data } = matter(rawContent);

	const postMetaData = getMetadataFromMatter(params.id, data);

	const contentHTML = (
		await unified()
			.use(remarkParse)
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeSlug)
			.use(rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: ['link-hover'] } })
			.use(rehypePrettyCode, {
				theme: 'github-dark',
				transformers: [
					transformerCopyButton({
						visibility: 'hover',
						feedbackDuration: 3_000,
					}),
				],
			})
			.use(rehypeStringify, { allowDangerousHtml: true })
			.use(remarkGfm)
			.process(content)
	).toString();

	return {
		recommendations: getRecommendations(postMetaData, getBlogPostsMetadata(), 2),
		...postMetaData,
		contentHTML,
	};
};

const CATEGORY_TAGS = new Set([
	'Tip',
	'Essay',
	'Showcase',
	'Tutorial',
	'Opinion',
	'Workshop',
	'Guide',
]);

function getRecommendations(current: Post, allPosts: Post[], limit = 6): Post[] {
	const currentId = current.id;

	// ignore category tags
	const currentTags = new Set(current.tags.filter((t) => !CATEGORY_TAGS.has(t)));

	const scored = allPosts
		.filter((p) => p.id !== currentId)
		.map((p) => {
			const overlap = countOverlap(
				currentTags,
				p.tags.filter((t) => !CATEGORY_TAGS.has(t))
			);
			return { post: p, overlap };
		});

	scored.sort((a, b) => {
		if (b.overlap !== a.overlap) return b.overlap - a.overlap;
		const byDate = b.post.pubDate.getTime() - a.post.pubDate.getTime();
		if (byDate !== 0) return byDate;
		return a.post.title.localeCompare(b.post.title);
	});

	return scored.slice(0, limit).map((s) => s.post);
}

function countOverlap(currentTags: Set<string>, otherTags: string[]): number {
	let matches = 0;
	for (const t of otherTags) if (currentTags.has(t)) matches++;
	return matches;
}
