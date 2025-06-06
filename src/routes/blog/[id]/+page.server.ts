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

import { blogPosts, CONTENT_BASE_PATH, getMetadataFromMatter } from '$lib/content';

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
		...postMetaData,
		contentHTML,
	};
};
