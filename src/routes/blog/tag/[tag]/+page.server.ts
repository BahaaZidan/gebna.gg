import { getBlogPostsMetadata } from '$lib/content';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const tag = params.tag;
	const posts = getBlogPostsMetadata().filter((p) => p.tags.includes(tag));

	return {
		tag,
		posts,
	};
};
