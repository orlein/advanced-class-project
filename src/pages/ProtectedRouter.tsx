import { RootState } from '@/RTK/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

type ProtectedRouterProps = {
  children: ReactNode;
};

const ProtectedRouter = ({ children }: ProtectedRouterProps) => {
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRouter;
