import {
  useDeleteChallengeMutation,
  useJoinChallengeMutation,
  useQuitChallengeMutation,
  useCreateNewChallengeMutation,
  useUpdateChallengeMutation,
  useUpdateChallengeImageMutation,
} from '@/api/challengeApi';

const useChallengeMutations = () => {
  const [joinChallenge] = useJoinChallengeMutation();
  const [quitChallenge] = useQuitChallengeMutation();
  const [createNewChallenge] = useCreateNewChallengeMutation();
  const [updateChallengeImage] = useUpdateChallengeImageMutation();
  const [updateChallenge] = useUpdateChallengeMutation();
  const [deleteChallenge] = useDeleteChallengeMutation();
  return {
    joinChallenge,
    quitChallenge,
    createNewChallenge,
    updateChallengeImage,
    updateChallenge,
    deleteChallenge,
  };
};

export default useChallengeMutations;
