import { createClient } from '@supabase/supabase-js';

export function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> c7c67afa078228f7bde1ae0c2b800036c11a9d72
