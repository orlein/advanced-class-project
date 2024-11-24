import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Pagination as ShadcnPagenation,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { SetStateAction, useMemo } from 'react';

const PAGE_GROUP_SIZE = 5;

type PaginationProps = {
  totalResults: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  perPage: number;
};

const Pagination = ({ totalResults, currentPage, setCurrentPage, perPage }: PaginationProps) => {
  const totalPages = Math.ceil(totalResults / perPage);
  const pageGroup = useMemo(() => Math.ceil(currentPage / PAGE_GROUP_SIZE), [currentPage]);
  const firstPageOfTheGroup = useMemo(() => (pageGroup - 1) * PAGE_GROUP_SIZE + 1, [pageGroup]);
  const lastPageOfTheGroup = useMemo(
    () => Math.min(pageGroup * PAGE_GROUP_SIZE, totalPages),
    [pageGroup, totalPages],
  );
  return (
    <>
      <ShadcnPagenation>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href="#"
              aria-disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              className="aria-disabled:text-muted-foreground aria-disabled:hover:bg-transparent"
            >
              <ChevronFirst size={16} />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              aria-disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => (prev === 1 ? prev : prev - 1))}
              className="aria-disabled:text-muted-foreground aria-disabled:hover:bg-transparent"
            >
              <ChevronLeft size={16} />
            </PaginationLink>
          </PaginationItem>
          {Array(lastPageOfTheGroup - firstPageOfTheGroup + 1)
            .fill(firstPageOfTheGroup)
            .map((pageNumber, idx) => pageNumber + idx)
            .map(page => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

          <PaginationItem>
            <PaginationLink
              href="#"
              aria-disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => (prev === totalPages ? prev : prev + 1))}
              className="aria-disabled:text-muted-foreground aria-disabled:hover:bg-transparent"
            >
              <ChevronRight />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              aria-disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className="aria-disabled:text-muted-foreground aria-disabled:hover:bg-transparent"
            >
              <ChevronLast size={16} />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </ShadcnPagenation>
    </>
  );
};

export default Pagination;
