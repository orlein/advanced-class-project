import { Heart, TrendingUp, Users } from 'lucide-react';
import { Card } from '../ui/card';
import { ChallengeData } from '@/types/challenge';
import { useNavigate } from 'react-router-dom';
import { calculateRemainingDays } from '@/lib/utils';
import useChallenges from '@/hooks/useChallenges';

interface CardProps {
  challenge: ChallengeData;
}

const ChallengeCard = ({ challenge }: CardProps) => {
  const navigate = useNavigate();
  const { challengeProgress } = useChallenges(challenge.id);
  const handleClick = () => navigate(`/challenges/${challenge.id}`);
  return (
    <Card
      key={challenge.id}
      className="p-5 pb-3 flex flex-col gap-3 w-full max-w-sm justify-between"
    >
      <div className="flex flex-col gap-3">
        <div onClick={handleClick} className="relative w-full aspect-square border cursor-pointer">
          {challenge.challengeImageUrl && (
            <img src={challenge.challengeImageUrl} className="object-cover w-full h-full" />
          )}
        </div>
        <h3 onClick={handleClick} className="text-xl font-bold line-clamp-1 cursor-pointer">
          {challenge.title}
        </h3>
        <div className="text-sm flex gap-4 items-center">
          <p className="flex gap-2 items-center">
            <Users size={18} />
            {challenge.challengeParticipantCount}
          </p>
          <p className="flex gap-2 items-center">
            <Heart size={18} />
            {challenge.likeCount}
          </p>
          <p className="flex gap-2 items-center">
            <TrendingUp size={18} />
            {challengeProgress}%
          </p>
        </div>
        <p onClick={handleClick} className="text-sm line-clamp-2 cursor-pointer">
          {challenge.description}
        </p>
      </div>
      <div className="text-sm text-end gap-2 text-muted-foreground">
        <span>{calculateRemainingDays(challenge.endDate)}</span>
      </div>
    </Card>
  );
};

export default ChallengeCard;
