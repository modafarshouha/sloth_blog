/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_SITE_URL?: string;
	readonly PUBLIC_PAGES_SUBPATH?: string;
	readonly PUBLIC_BASE_PATH?: string;
	readonly PUBLIC_SUPABASE_URL?: string;
	readonly PUBLIC_SUPABASE_ANON_KEY?: string;
}
