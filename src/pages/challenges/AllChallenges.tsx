import { useGetChallengesQuery } from '@/api/challengeApi';
import ChallengeCard from '@/components/molecule/ChallengeCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CaretSortIcon } from '@radix-ui/react-icons';

export default function AllChallenges() {
  const { data: challengeList } = useGetChallengesQuery({});

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

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-7">
        {challengeList &&
          challengeList.map(challenge => (
            <ChallengeCard challenge={challenge} key={challenge.id} />
          ))}
      </section>

      {/* 페이지네이션 */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
