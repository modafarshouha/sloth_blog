import type { APIRoute } from 'astro';
import { withBase } from '../utils/path';

export const GET: APIRoute = ({ site }) => {
	const sitemapURL = new URL(withBase('sitemap-index.xml'), site ?? 'https://modafarshouha.github.io/').href;
	const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapURL}\n`;
	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
