-- Run in Supabase SQL Editor (Dashboard → SQL → New query).
-- See docs/ANALYTICS.md for setup and CORS.

create table if not exists public.blog_post_views (
	slug text primary key check (char_length(slug) <= 300),
	read_count bigint not null default 0,
	unique_read_count bigint not null default 0
);

create table if not exists public.blog_post_visitors (
	slug text not null check (char_length(slug) <= 300),
	visitor_id text not null check (char_length(visitor_id) <= 100),
	primary key (slug, visitor_id)
);

create or replace function public.record_post_read(p_slug text, p_visitor_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
	inserted_rows int;
begin
	insert into public.blog_post_views (slug, read_count, unique_read_count)
	values (p_slug, 1, 0)
	on conflict (slug) do update
		set read_count = public.blog_post_views.read_count + 1;

	insert into public.blog_post_visitors (slug, visitor_id)
	values (p_slug, p_visitor_id)
	on conflict (slug, visitor_id) do nothing;
	get diagnostics inserted_rows = row_count;

	if inserted_rows > 0 then
		update public.blog_post_views
		set unique_read_count = unique_read_count + 1
		where slug = p_slug;
	end if;
end;
$$;

alter table public.blog_post_views enable row level security;
alter table public.blog_post_visitors enable row level security;

drop policy if exists "Allow public read of view counts" on public.blog_post_views;
create policy "Allow public read of view counts"
	on public.blog_post_views for select
	using (true);

revoke all on public.blog_post_visitors from anon, authenticated;
revoke insert, update, delete on public.blog_post_views from anon, authenticated;

grant select on public.blog_post_views to anon;
grant execute on function public.record_post_read(text, text) to anon;
