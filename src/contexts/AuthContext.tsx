import { onAuthStateChange, googleSignIn } from '@/auth/googleAuth';
import { User } from '@supabase/supabase-js';
import { signOut } from '@/auth/localAuth';
import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from 'react';

interface AuthContextType {
  user: User | null;
  googleSignIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = onAuthStateChange(setUser);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};
