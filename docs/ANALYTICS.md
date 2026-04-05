# Analytics (reads per post)

The site can show **total reads** and **unique reads** on each blog post. Counts are optional and require a small **Supabase** project (free tier is enough for personal traffic).

## How it works

1. On each post page load, the browser calls a Supabase RPC `record_post_read(slug, visitor_id)`.
2. **Total reads** increments on every load.
3. **Unique reads** increments only the first time a given `visitor_id` loads that slug. `visitor_id` is a random UUID stored in `localStorage` under `blog_visitor_id` (per browser profile, not a perfect “person”, but practical for a static site).

Direct table writes from the browser are restricted; only the security-definer function updates rows.

## Setup

### 1. Create a Supabase project

1. Sign in at [supabase.com](https://supabase.com) and create a project.
2. Open **SQL Editor**, paste the contents of `supabase/schema.sql`, and run it.

### 2. Keys and environment variables

From **Project Settings → API**:

- **Project URL** → `PUBLIC_SUPABASE_URL`
- **anon public** key → `PUBLIC_SUPABASE_ANON_KEY`

Add them to `.env` for local builds:

```env
PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

For GitHub Actions, add the same two values as **repository secrets** named `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` (the workflow already passes them into `npm run build`).

The anon key is designed to be public in the client bundle; access is limited by Row Level Security and the RPC.

### 3. CORS and allowed origins

Supabase must allow requests from your GitHub Pages origin.

In the Supabase dashboard, open **Project Settings → API** (or **Authentication → URL Configuration**, depending on dashboard version) and add your site URL(s), for example:

- `https://modafarshouha.github.io`
- `https://modafarshouha.github.io` with path if required by the UI

If the dashboard offers **Site URL** / **Additional redirect URLs** / **Allowed request origins**, include the exact origin you use in the browser. Without this, browser `fetch` calls may be blocked by CORS.

### 4. Verify

Open a published post, reload twice in the same browser: **Reads** should increase each time; **Unique** should stay at 1. Open the same post in a private window: **Reads** increases; **Unique** increases by 1.

## Without Supabase

If the two `PUBLIC_SUPABASE_*` variables are unset, the stats block is omitted and the site stays fully static with no external calls.

## Privacy note

This records anonymous counters and a random client id in `localStorage`. It does not include comment forms or accounts. For stricter analytics, consider a dedicated product (Plausible, Fathom, etc.) and integrate it separately.
