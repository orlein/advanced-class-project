import { supabase } from '@/api/supabaseClient';

export function signOut() {
  supabase.auth.signOut();
}
