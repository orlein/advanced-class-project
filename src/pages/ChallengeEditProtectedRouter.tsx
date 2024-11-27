import { useGetChallengeInfoQuery } from '@/api/challengeApi';
import { RootState } from '@/RTK/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

type ProtectedRouterProps = {
  children: ReactNode;
};

const ChallengeEditProtectedRouter = ({ children }: ProtectedRouterProps) => {
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  const userId = sessionStorage.getItem('userId');
  const { challenge_id: challengeId } = useParams();
  const { data: challenge } = useGetChallengeInfoQuery({ challengeId: challengeId ?? '' });
  if (!isSignedIn || userId !== challenge?.accountId) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ChallengeEditProtectedRouter;
