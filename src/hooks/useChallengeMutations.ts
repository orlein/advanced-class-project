import {
  useDeleteChallengeMutation,
  useJoinChallengeMutation,
  useQuitChallengeMutation,
  useCreateNewChallengeMutation,
  useUpdateChallengeMutation,
} from '@/api/challengeApi';

const useChallengeMutations = () => {
  const [joinChallenge] = useJoinChallengeMutation();
  const [quitChallenge] = useQuitChallengeMutation();
  const [createNewChallenge] = useCreateNewChallengeMutation();
  const [updateChallenge] = useUpdateChallengeMutation();
  const [deleteChallenge] = useDeleteChallengeMutation();
  return {
    joinChallenge,
    quitChallenge,
    createNewChallenge,
    updateChallenge,
    deleteChallenge,
  };
};

export default useChallengeMutations;
