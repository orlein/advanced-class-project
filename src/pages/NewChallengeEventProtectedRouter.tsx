import useChallenges from '@/hooks/useChallenges';
import { ReactNode } from 'react';
import { Navigate, useParams } from 'react-router-dom';

type ProtectedRouterProps = {
  children: ReactNode;
};

const NewChallengeEventProtectedRouter = ({ children }: ProtectedRouterProps) => {
  const { challenge_id: challengeId } = useParams();
  const { isMember, isMemberFetchingLoading } = useChallenges(challengeId ?? '');
  if (!isMemberFetchingLoading && !isMember) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default NewChallengeEventProtectedRouter;
