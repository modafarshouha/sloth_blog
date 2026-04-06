# Inside Out Ideas

In this blog I write about topics that I'm interested in and questions I’m trying to answer; often around AI and human experience. I aim to be accurate and grounded in sources where I can, but some parts stay speculative, thought-provoking, and open-ended.

## Documentation

| Document | Purpose |
|----------|---------|
| [docs/PUBLISHING.md](docs/PUBLISHING.md) | GitHub repository setup, `base` URL, Actions deploy, writing posts |
| [docs/ANALYTICS.md](docs/ANALYTICS.md) | Supabase schema, environment variables, CORS, how counts work |

## Project layout

- `src/content/blog/` — Markdown posts
- `src/pages/` — Routes (home, blog listing, about, RSS)
- `src/consts.ts` — Site title, description, author name
- `supabase/schema.sql` — Database objects for optional analytics
- `.github/workflows/deploy.yml` — Build and deploy to GitHub Pages

## License

See [LICENSE](LICENSE).

- **Code** (source, config, assets): **All rights reserved.** Copying, forking, and reuse are not permitted.
- **Blog content** (published posts): May be quoted and shared **with proper citation**. Each post includes ready-made citations in APA, MLA, IEEE, and BibTeX formats.
