import { createClient } from '@supabase/supabase-js';

const configuredSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl =
  configuredSupabaseUrl?.match(/\]\((https?:\/\/[^)]+)\)/)?.[1] ??
  configuredSupabaseUrl?.trim().replace(/^\[|\]$/g, '');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase is not configured. Add SUPABASE_URL and SUPABASE_ANON_KEY to Secrets.',
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});