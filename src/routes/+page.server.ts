import { getBlogPostsMetadata } from '$lib/content';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const posts = getBlogPostsMetadata();
	const tags = Array.from(new Set(posts.map((p) => p.tags).flat()));

	return { posts, tags };
};
