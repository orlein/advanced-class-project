import { onAuthStateChange } from '@/api/FakeAuthApi';
import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from 'react';

interface AuthContextType {
  user: object | null;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<object | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const signIn = () => setIsLoggedIn(true);
  const signOut = () => setIsLoggedIn(false);

  useEffect(() => {
    onAuthStateChange(isLoggedIn, setUser);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
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
