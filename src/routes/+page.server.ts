import { getBlogPostsMetadata } from '$lib/content';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const posts = getBlogPostsMetadata();

	return { posts };
};
