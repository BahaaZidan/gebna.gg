import { getArticles } from '$lib';
import RSS from 'rss';

export async function GET() {
	const feed = new RSS({
		title: 'Gebna blog',
		description: "Gebna, GebnaTorky, or Bahaa Zidan's Blog",
		site_url: 'https://gebna.gg/',
		feed_url: 'https://gebna.gg/rss.xml',
		managingEditor: 'gebnatorky@gmail.com (Bahaa Zidan)',
		webMaster: 'gebnatorky@gmail.com (Bahaa Zidan)',
		copyright: `Copyright ${new Date().getFullYear().toString()}, Bahaa Zidan / Gebna`,
		language: 'en-US',
		pubDate: new Date().toUTCString(),
		ttl: 60
	});
	const articles = getArticles();

	for (const article of articles) {
		feed.item({
			title: article.title,
			description: article.description,
			url: `https://gebna.gg${article.path}`,
			author: 'Gebna (Bahaa Zidan)',
			date: article.publishDate
		});
	}

	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
}
