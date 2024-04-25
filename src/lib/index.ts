const articlesGlobImport = import.meta.glob<{ metadata: Record<string, string> }>(
	'../routes/blog/**/*.svx',
	{
		eager: true
	}
);

export function getArticles() {
	const articles = Array.from(Object.entries(articlesGlobImport))
		.map((x) => {
			return {
				path: x[0].replace('/+page.svx', '').replace('../routes', ''),
				publishDate: x[1].metadata?.date,
				title: x[1].metadata?.title,
				description: x[1].metadata?.description
			};
		})
		.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

	return articles;
}
