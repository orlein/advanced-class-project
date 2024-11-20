import { Heart } from 'lucide-react';
import { Card } from '../ui/card';
import { ChallengeData } from '@/types/challenge';

interface CardProps {
  challenge: ChallengeData;
}

const ChallengeCard = ({ challenge }: CardProps) => {
  const calculateRemainingDays = (endDate: string): number => {
    return Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  };
  return (
    <Card
      key={challenge.id}
      className="p-5 pb-3 flex flex-col gap-3 w-full aspect-[2/3] max-w-sm justify-between"
    >
      <div className="flex flex-col gap-3">
        <div className="w-full aspect-square border">image</div>
        <h3 className="text-xl font-bold line-clamp-1">{challenge.title}</h3>
        <div className="text-sm flex gap-2 items-center">
          <Heart size={18} />
          {challenge.likeCount}
        </div>
        <p className="text-sm line-clamp-2">{challenge.description}</p>
      </div>
      <p className="text-sm text-end text-muted-foreground">
        {calculateRemainingDays(challenge.endDate)}일 남음
      </p>
    </Card>
  );
};

export default ChallengeCard;
