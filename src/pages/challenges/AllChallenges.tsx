import { useGetChallengesQuery } from '@/api/challengeApi';
import ChallengeCard from '@/components/molecule/ChallengeCard';
import Pagination from '@/components/molecule/Pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

const PER_PAGE = 10;

export default function AllChallenges() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data } = useGetChallengesQuery({
    page: currentPage.toString(),
    limit: PER_PAGE.toString(),
  });
  const challengeList = data?.data;

  return (
    <div className="w-full flex flex-col gap-5 items-center">
      <section className="flex gap-2 w-full justify-center md:justify-end">
        <Select>
          <SelectTrigger className="w-28">
            <SelectValue placeholder="진행 상태" />
            <CaretSortIcon className="h-4 w-4 opacity-50" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">모든 상태</SelectItem>
            <SelectItem value="dark">진행 중</SelectItem>
            <SelectItem value="system">진행 완료</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex max-w-96 gap-2 flex-grow">
          <Input /> <Button>검색</Button>
        </div>
      </section>

      <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-7">
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
          perPage={PER_PAGE}
        />
      )}
    </div>
  );
}
