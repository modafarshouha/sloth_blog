// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

function normalizeBase(raw) {
	let base = raw ?? '/';
	if (!base.startsWith('/')) base = `/${base}`;
	if (base !== '/' && !base.endsWith('/')) base = `${base}/`;
	return base;
}

/**
 * Git Bash on Windows rewrites env values like PUBLIC_BASE_PATH=/my-repo/ into a filesystem path.
 * Prefer PUBLIC_PAGES_SUBPATH=my-repo (no slashes) for project pages.
 */
function resolveBase() {
	const seg = process.env.PUBLIC_PAGES_SUBPATH?.trim();
	if (seg) {
		const clean = seg.replace(/^\/+|\/+$/g, '');
		if (!clean) return '/';
		return `/${clean}/`;
	}
	const raw = process.env.PUBLIC_BASE_PATH;
	const s = raw != null ? String(raw) : '';
	if (s && (s.includes(':') || s.includes('\\'))) {
		console.warn(
			'[astro] Ignoring PUBLIC_BASE_PATH that looks like a filesystem path. Use PUBLIC_PAGES_SUBPATH=my-repo (repo name only), or set PUBLIC_BASE_PATH in PowerShell/cmd, or MSYS_NO_PATHCONV=1 in Git Bash.',
		);
		return '/';
	}
	return normalizeBase(raw);
}

const site = process.env.PUBLIC_SITE_URL || 'https://modafarshouha.github.io';
const base = resolveBase();

// https://astro.build/config
export default defineConfig({
	site,
	base,
	integrations: [mdx(), sitemap()],
});
