import { getArticles } from '$lib';

export async function GET() {
	const articles = getArticles();
	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
				<url>
					<loc>https://gebna.gg/</loc>
					<lastmod>2024-05-10</lastmod>
				</url>
				<url>
					<loc>https://gebna.gg/whoami</loc>
					<lastmod>2024-05-10</lastmod>
				</url>
				<url>
					<loc>https://gebna.gg/support</loc>
					<lastmod>2024-05-10</lastmod>
				</url>
				<url>
          <loc>https://gebna.gg/recommendations</loc>
          <lastmod>2024-05-10</lastmod>
        </url>
      ${articles
				.map(
					(article) => `
        <url>
          <loc>https://gebna.gg${article.path}</loc>
          <lastmod>${article.publishDate}</lastmod>
        </url>
      `
				)
				.join('\n')}
		</urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
