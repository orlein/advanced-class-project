import { useGetChallengesQuery } from '@/api/challengeApi';
import ChallengeCard from '@/components/molecule/ChallengeCard';
import Pagination, { PER_PAGE } from '@/components/molecule/Pagination';
import { Button } from '@/components/ui/button';
import { ChallengeSortBy, ChallengeSortOrder } from '@/types/challenge';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

export default function AllChallenges() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<ChallengeSortBy>('endDate');
  const [order, setOrder] = useState<ChallengeSortOrder>({
    endDate: 'asc',
    likeCount: 'asc',
    challengeParticipantCount: 'asc',
  });
  const { data } = useGetChallengesQuery({
    page: currentPage.toString(),
    limit: PER_PAGE.toString(),
    sortBy,
    order: order[sortBy],
  });
  const challengeList = data?.data;
  const handleSortOrder = (selectedSort: ChallengeSortBy) => {
    setSortBy(selectedSort);
    setOrder(prev => ({
      ...prev,
      [selectedSort]: prev[selectedSort] === 'desc' ? 'asc' : 'desc',
    }));
  };
  return (
    <div className="w-full flex flex-col gap-5 items-center">
      <div className="flex md:self-end text-sm">
        <Button variant="ghost" onClick={() => handleSortOrder('endDate')}>
          마감순
          <ChevronsUpDown />
        </Button>
        <Button variant="ghost" onClick={() => handleSortOrder('likeCount')}>
          좋아요순
          <ChevronsUpDown />
        </Button>
        <Button variant="ghost" onClick={() => handleSortOrder('challengeParticipantCount')}>
          참여인원순
          <ChevronsUpDown />
        </Button>
      </div>
      <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-7 place-items-center items-stretch ">
        {challengeList &&
          challengeList.map(challenge => (
            <ChallengeCard challenge={challenge} key={challenge.id} />
          ))}
      </section>
      {data && (
        <Pagination
          totalResults={Number(data.meta.total)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
