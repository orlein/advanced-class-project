import { Badge } from '@/components/ui/badge';
import { calculateRemainingDays } from '../../../components/molecule/ChallengeCard';
import { Separator } from '@/components/ui/separator';
import ChallengeJoinOrQuitOrDeleteButton from '@/components/molecule/ChallengeJoinOrQuitOrDeleteButton';
import { Toaster } from '@/components/ui/toaster';
import useChallenges from '@/hooks/useChallenges';
import ProfileImage from '@/components/molecule/ProfileImage';
import {
  useCancelLikeChallengeMutation,
  useChallengeLikeStatusQuery,
  useGetChallengeInfoQuery,
  useLikeChallengeMutation,
} from '@/api/challengeApi';
import LoginAlert from '@/components/molecule/LoginAlert';
import { RootState } from '@/RTK/store';
import { Edit, Heart, Users } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import LikeAlert from '@/components/molecule/LikeAlert';

const DATE_STYLE = 'flex gap-2 items-center text-sm cursor-default';

export default function ChallengeDetailDescription() {
  const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false);
  const [showLikeAlert, setShowLikeAlert] = useState<boolean>(false);
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  const { challenge_id: challengeId } = useParams<{ challenge_id: string }>();
  const { isCreatedByMe, numberOfMembers } = useChallenges(challengeId!);
  const navigate = useNavigate();
  const { data: challenge, refetch: challengeRefetch } = useGetChallengeInfoQuery({
    challengeId: challengeId!,
  });
  const [likeChallenge] = useLikeChallengeMutation();
  const [cancelLikeChallenge] = useCancelLikeChallengeMutation();
  const { data: likeStatus, refetch: likeStatusRefetch } = useChallengeLikeStatusQuery(
    {
      challengeId: challengeId!,
    },
    { skip: !isSignedIn },
  );
  const handleLike = () => {
    if (!isSignedIn) {
      setShowLoginAlert(true);
      return;
    }
    if (isCreatedByMe) {
      setShowLikeAlert(true);
      return;
    }
    const likeAction = likeStatus?.count ? cancelLikeChallenge : likeChallenge;

    likeAction({ challengeId: challengeId! }).then(() => {
      challengeRefetch();
      likeStatusRefetch();
    });
  };
  const convertDate = (date: string) => {
    const [yyyy, mm, dd] = date.split('T')[0].split('-');
    return `${yyyy}년 ${mm}월 ${dd}일`;
  };
  const { challengeCreator } = useChallenges(challenge?.id!);
  return (
    <div className="w-full">
      <div className="flex flex-col items-center w-full">
        <section className="self-start flex justify-between items-center w-full">
          <div className="flex gap-3 items-center">
            <h1 className="text-3xl font-bold">{challenge?.title}</h1>
            {isCreatedByMe && (
              <Edit
                size={20}
                onClick={() => navigate(`/challenges/${challenge?.id}/edit`)}
                className="cursor-pointer"
              />
            )}
          </div>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-2 min-w-10">
              <Users size={18} />
              <span>{numberOfMembers}</span>
            </p>
            <p className="flex items-center gap-2 min-w-10">
              <Heart
                size={18}
                onClick={handleLike}
                className={`cursor-pointer ${likeStatus?.count && 'text-primary'}`}
              />
              <span>{challenge?.likeCount}</span>
            </p>
          </div>
        </section>
      </div>
      <section className="self-start my-5 w-full flex flex-col gap-5">
        <div className="flex gap-2 items-center">
          <ProfileImage url={challengeCreator?.profileImageUrl} variant="challenge" />
          <span className="text-sm font-semibold">{challengeCreator?.username}</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className={DATE_STYLE}>
            <Badge variant="secondary">시작 일자</Badge>
            {challenge && convertDate(challenge.startDate)}
          </div>
          <div className={DATE_STYLE}>
            <Badge variant="secondary">종료 일자</Badge>
            {challenge && convertDate(challenge.endDate)}
          </div>
          <div className={DATE_STYLE}>
            <Badge>남은 일자</Badge>
            {challenge && calculateRemainingDays(challenge.endDate)}
          </div>
        </div>
        <Separator />
        <div>{challenge && challenge.description}</div>
        <Separator />
        <div className="mt-5 self-end">
          <ChallengeJoinOrQuitOrDeleteButton challenge={challenge!} />
        </div>
        <Toaster />
        <LoginAlert showLoginAlert={showLoginAlert} setShowLoginAlert={setShowLoginAlert} />
        <LikeAlert showLikeAlert={showLikeAlert} setShowLikeAlert={setShowLikeAlert} />
      </section>
    </div>
  );
}
