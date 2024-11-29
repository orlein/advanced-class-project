import { useGetAnotherUserInfoQuery } from '@/api/accountApi';
import { useGetChallengeInfoQuery, useGetChallengeMembersQuery } from '@/api/challengeApi';

const useChallenges = (challengeId: string) => {
  const userId = sessionStorage.getItem('userId');
  const {
    data: members,
    isLoading: isMemberFetchingLoading,
    refetch: memberStatusRefetch,
  } = useGetChallengeMembersQuery({ challengeId }, { skip: !challengeId });
  const { data: challengeInfo, refetch: challengeInfoRefetch } = useGetChallengeInfoQuery(
    { challengeId },
    { skip: !challengeId },
  );
  const isCreatedByMe = challengeInfo?.accountId === userId ? true : false;
  const isMember = !isMemberFetchingLoading && members?.some(member => member.id === userId);
  const { data: challengeCreator } = useGetAnotherUserInfoQuery(
    { userId: challengeInfo?.accountId ?? '' },
    { skip: !challengeInfo?.accountId },
  );
  const challengeProgress =
    Number(challengeInfo?.challengeEventCheckedParticipantsFraction ?? 0) * 100;

  return {
    memberStatusRefetch,
    challengeInfoRefetch,
    members,
    isMemberFetchingLoading,
    challengeInfo,
    isCreatedByMe,
    isMember,
    challengeCreator,
    challengeProgress,
  };
};

export default useChallenges;
