import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[CMS] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables. The public site will gracefully fall back to local static components.'
  );
}

export const supabase = createClient<Database>(
  supabaseUrl || 'https://wbckdglxkogblbegskho.supabase.co',
  supabaseAnonKey || 'sb_publishable_jz4bnJfjrb0ljyvDdStXMw_2cbGf1t9',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);
