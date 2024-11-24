import { useGetAnotherUserInfoQuery } from '@/api/accountApi';
import { useGetChallengeInfoQuery, useGetChallengeMembersQuery } from '@/api/challengeApi';

const useChallenges = (challengeId: string) => {
  const userId = sessionStorage.getItem('userId');
  const { data: members, refetch: memberStatusRefetch } = useGetChallengeMembersQuery(
    { challengeId },
    { skip: !challengeId },
  );
  const { data: challengeInfo } = useGetChallengeInfoQuery({ challengeId }, { skip: !challengeId });
  const isCreatedByMe = challengeInfo?.accountId === userId ? true : false;
  const numberOfMembers = members?.length;
  const isMember = members?.some(member => member.id === userId);
  const { data: challengeCreator } = useGetAnotherUserInfoQuery(
    { userId: challengeInfo?.accountId! },
    { skip: !challengeInfo?.accountId },
  );

  return {
    memberStatusRefetch,
    challengeInfo,
    isCreatedByMe,
    numberOfMembers,
    isMember,
    challengeCreator,
  };
};

export default useChallenges;
