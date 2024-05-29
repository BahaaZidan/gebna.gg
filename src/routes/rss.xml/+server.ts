import { getArticles } from '$lib';
import { Feed } from 'feed';

export const prerender = true;

export async function GET() {
	const feed = new Feed({
		title: 'Gebna blog',
		description: "Gebna, GebnaTorky, or Bahaa Zidan's Blog",
		id: 'https://gebna.gg/',
		link: 'https://gebna.gg/',
		language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
		favicon: 'https://gebna.gg/favicon.ico',
		copyright: `Copyright ${new Date().getFullYear().toString()}, Bahaa Zidan / Gebna`,
		generator: '🍉', // optional, default = 'Feed for Node.js'
		feedLinks: {
			rss: 'https://gebna.gg/rss.xml'
		},
		author: {
			name: 'Gebna / Bahaa Zidan',
			email: 'gebnatorky@gmail.com',
			link: 'https://gebna.gg/whoami'
		},
		ttl: 60
	});
	const articles = getArticles();

	for (const article of articles) {
		feed.addItem({
			title: article.title,
			description: article.description,
			content: `<p>${article.description}</p> <div style="margin-top: 50px; font-style: italic;"> <strong><a href="https://gebna.gg${article.path}">Keep reading</a>.</strong> </div> <br /> <br />`,
			link: `https://gebna.gg${article.path}`,
			id: `https://gebna.gg${article.path}`,
			author: [
				{
					name: 'Gebna / Bahaa Zidan',
					email: 'gebnatorky@gmail.com',
					link: 'https://gebna.gg/whoami'
				}
			],
			date: new Date(article.publishDate)
		});
	}

	return new Response(feed.rss2(), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
}
