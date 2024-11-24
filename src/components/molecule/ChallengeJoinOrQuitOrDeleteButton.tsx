import { Button } from '@/components/ui/button';
import useChallenges from '@/hooks/useChallenges';

import { ChallengeData } from '@/types/challenge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import useChallengeMutations from '@/hooks/useChallengeMutations';

const ChallengeJoinOrQuitOrDeleteButton = ({ challenge }: { challenge: ChallengeData }) => {
  const { isMember, memberStatusRefetch, isCreatedByMe } = useChallenges(challenge?.id);
  const { joinChallenge, quitChallenge, deleteChallenge } = useChallengeMutations();
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleJoinChallengeClick = () => {
    joinChallenge({ challengeId: challenge.id }).then(() => memberStatusRefetch());
    toast({
      title: '챌린지 참여 완료!',
      description: '이제 챌린지를 진행할 수 있습니다!',
      duration: 2000,
    });
  };
  const handleQuitChallenge = () => {
    quitChallenge({ challengeId: challenge.id }).then(() => memberStatusRefetch());
    toast({
      title: '챌린지 탈퇴 완료!',
      description: '다음에 다시 도전해주세요!',
      duration: 2000,
    });
  };
  const handleDeleteChallenge = () => {
    deleteChallenge({ challengeId: challenge.id }).then(() => navigate('/challenges'));
  };
  if (!challenge) return <></>;
  return (
    <>
      {isCreatedByMe && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">삭제하기</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>챌린지 삭제</AlertDialogTitle>
              <AlertDialogDescription>
                챌린지를 삭제하면 다시 복구할 수 없습니다. 삭제하시겠습니까?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteChallenge}>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {!isCreatedByMe &&
        (isMember ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">탈퇴하기</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>챌린지 탈퇴</AlertDialogTitle>
                <AlertDialogDescription>챌린지를 포기하시겠습니까?</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction onClick={handleQuitChallenge}>확인</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button onClick={handleJoinChallengeClick}>참여하기</Button>
        ))}
    </>
  );
};

export default ChallengeJoinOrQuitOrDeleteButton;
