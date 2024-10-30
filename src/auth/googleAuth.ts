import { supabase } from '@/api/supabaseClient';
import { User } from '@supabase/supabase-js';

const provider = 'google';

export function googleSignIn() {
  supabase.auth.signInWithOAuth({
    provider,
  });
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((_, session) => {
    const updatedUser = session ? session.user : null;
    callback(updatedUser);
    updatedUser && console.log('🌝 signed in:', updatedUser);
    !updatedUser && console.log('🌚 signed out');
  });
}
