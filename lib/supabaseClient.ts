
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error(
    "Missing Supabase env vars. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local"
  );
}

declare global {
  // allow HMR to reuse the client across reloads
  // eslint-disable-next-line no-var
  var __supabase_client__: SupabaseClient | undefined;
}

export function getSupabaseClient() {
  if (!globalThis.__supabase_client__) {
    globalThis.__supabase_client__ = createClient(SUPABASE_URL!, SUPABASE_KEY!);
  }
  return globalThis.__supabase_client__;
}

