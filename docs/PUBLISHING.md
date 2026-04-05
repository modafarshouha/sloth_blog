# Publishing guide

This site is a static Astro build. GitHub Pages serves the contents of the `dist/` folder produced by `npm run build`.

## Quick start (local development)

```bash
npm install
cp .env.example .env
# Edit .env — set PUBLIC_SITE_URL and PUBLIC_PAGES_SUBPATH (see section 2 below).
# Optionally add Supabase keys (see ANALYTICS.md).
npm run dev
```

```bash
npm run build
npm run preview
```

## 1. Create the GitHub repository

1. Create a new repository on GitHub (private is fine; Pages still works on paid plans and for public repos per GitHub’s current rules—confirm in [GitHub Pages documentation](https://docs.github.com/pages)).
2. Push this project to the default branch (commonly `main`).

## 2. Choose your Pages URL shape

GitHub Pages offers two common URL patterns:

| Hosting style | Example URL | `PUBLIC_SITE_URL` | Base path config |
|---------------|-------------|-------------------|------------------|
| **User or org site** (repo named `modafarshouha.github.io`) | `https://modafarshouha.github.io/` | `https://modafarshouha.github.io` | Leave `PUBLIC_PAGES_SUBPATH` empty |
| **Project site** (repo named `sloth_blog`) | `https://modafarshouha.github.io/sloth_blog/` | `https://modafarshouha.github.io` | `PUBLIC_PAGES_SUBPATH=sloth_blog` |

Use **`PUBLIC_PAGES_SUBPATH`** with the **repository name only** (no slashes). The build turns it into `/blog/` automatically.

**Windows Git Bash:** assigning `PUBLIC_BASE_PATH=/blog/` is rewritten into a disk path. Use `PUBLIC_PAGES_SUBPATH` in `.env`, or set `PUBLIC_BASE_PATH` from **PowerShell/cmd**, or prefix with `MSYS_NO_PATHCONV=1` in Bash.

Alternatively, on Unix or CI, you may set `PUBLIC_BASE_PATH=/your-repo/` instead of `PUBLIC_PAGES_SUBPATH`.

Locally, copy `.env.example` to `.env` and set:

- `PUBLIC_SITE_URL` — canonical origin (no trailing slash).
- `PUBLIC_PAGES_SUBPATH` — e.g. `my-repo` for project pages, or leave blank for a user site.

These values are read at **build time** by `astro.config.mjs` and baked into URLs (RSS, sitemap, canonical links, and asset prefixes). Prefer **`PUBLIC_PAGES_SUBPATH`** so local builds behave the same on Windows and Linux.

## 3. Configure GitHub Actions and Pages

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch” using `/docs` or `gh-pages`, unless you intentionally prefer that flow).
3. Open **Settings → Secrets and variables → Actions**:
   - **Variables** (recommended for non-secret config): add `PUBLIC_SITE_URL` and `PUBLIC_PAGES_SUBPATH` (or `PUBLIC_BASE_PATH`) to match section 2.
   - **Secrets** (optional): add `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` if you use analytics (see [ANALYTICS.md](ANALYTICS.md)).

The workflow file `.github/workflows/deploy.yml` builds on every push to `main` or `master` and publishes the `dist/` artifact to Pages.

After the first successful run, Pages shows the live URL in the workflow summary and under **Settings → Pages**.

## 4. Write and publish a post

1. Create a `.md` file in `src/content/blog/`, e.g. `src/content/blog/my-post.md`.
2. Copy the template below and fill in your content:

```markdown
---
title: 'My new post'
description: 'A short summary for SEO.'
pubDate: 2026-04-05
---

Your content here. Standard Markdown — headings, lists, **bold**, *italic*, code blocks, links, images all work.
```

### Frontmatter fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title shown on the page and in listings |
| `description` | Yes | Short summary for SEO meta tags and RSS |
| `pubDate` | Yes | Publication date (formats: `2026-04-05`, `5 Apr 2026`, etc.) |
| `updatedDate` | No | Date of last update; shown as "Updated ..." below the title |
| `heroImage` | No | Path to a hero image relative to the post, e.g. `../../assets/my-image.jpg` |

### Full template with all optional fields

```markdown
---
title: 'My new post'
description: 'A short summary for SEO.'
pubDate: 2026-04-05
updatedDate: 2026-04-06
heroImage: ../../assets/my-image.jpg
---

Your content here.
```

3. **Locally:** save the file — the dev server picks it up instantly at `http://localhost:4321/blog/my-post/`.
4. **Production:** commit and push to `main`. The GitHub Action rebuilds and deploys automatically.

### Delete a post

Delete the `.md` file from `src/content/blog/`, commit, and push. The post is removed on the next deploy.

### Edit a post

Open the `.md` file, change whatever you need, save, commit, and push.

To remove sample posts that came with the template, delete their files from `src/content/blog/`.

## 5. Customize site copy

Edit `src/consts.ts` for `SITE_TITLE`, `SITE_DESCRIPTION`, and `COPYRIGHT_HOLDER`. Adjust navigation in `src/components/Header.astro` if you add pages.

## 6. Custom domain (optional)

If you use a custom domain, set `PUBLIC_SITE_URL` to that origin (for example `https://blog.example.com`) and configure the DNS and **Settings → Pages → Custom domain** in GitHub. You may add a `public/CNAME` file if you use the documented CNAME workflow; Astro will copy `public/` into `dist/`.

## Troubleshooting

- **Broken CSS or links on GitHub Pages** — Almost always a wrong base path for a project site. Set `PUBLIC_PAGES_SUBPATH` to the repo name (same segment as in `username.github.io/repo-name/`).
- **404 on fresh deploy** — Wait a minute for CDN propagation; confirm the Actions job succeeded and Pages source is **GitHub Actions**.
- **RSS or sitemap wrong** — Rebuild after changing `PUBLIC_SITE_URL` or base path variables; they are fixed at build time.
