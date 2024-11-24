import { Heart, Users } from 'lucide-react';
import { Card } from '../ui/card';
import { ChallengeData } from '@/types/challenge';
import { useNavigate } from 'react-router-dom';
import useChallenges from '@/hooks/useChallenges';

interface CardProps {
  challenge: ChallengeData;
}
export const calculateRemainingDays = (endDate: string): string => {
  const remainingDays = Math.ceil(
    (new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );
  return remainingDays > 0 ? `${remainingDays}일 남음` : '종료';
};

const ChallengeCard = ({ challenge }: CardProps) => {
  const { numberOfMembers } = useChallenges(challenge?.id);
  const navigate = useNavigate();
  const handleClick = () => navigate(`/challenges/${challenge.id}`);
  return (
    <Card
      key={challenge.id}
      className="p-5 pb-3 flex flex-col gap-3 w-full max-w-sm justify-between"
    >
      <div className="flex flex-col gap-3">
        <div onClick={handleClick} className="w-full aspect-square border cursor-pointer">
          image
        </div>
        <h3 onClick={handleClick} className="text-xl font-bold line-clamp-1 cursor-pointer">
          {challenge.title}
        </h3>
        <div className="text-sm flex gap-4 items-center">
          <p className="flex gap-2 items-center">
            <Users size={18} />
            {numberOfMembers}
          </p>
          <p className="flex gap-2 items-center">
            <Heart size={18} />
            {challenge.likeCount}
          </p>
        </div>
        <p onClick={handleClick} className="text-sm line-clamp-2 cursor-pointer">
          {challenge.description}
        </p>
      </div>
      <p className="text-sm text-end text-muted-foreground">
        {calculateRemainingDays(challenge.endDate)}
      </p>
    </Card>
  );
};

export default ChallengeCard;
