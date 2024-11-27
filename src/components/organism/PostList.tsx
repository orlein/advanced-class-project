import { useMemo, useState, useEffect } from 'react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
  RowSelectionState,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { useGetPostsQuery, useDeletePostMutation } from '@/api/postsApi';
import { debounce } from 'lodash';
import { useGetUserInfoQuery } from '@/api/accountApi';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';

export type PostData = {
  id: string;
  No: number;
  title: string;
  accountUsername: string;
  viewCount: number;
  createdAt: string;
};

export default function PostList() {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState('');

  // 현재 사용자 정보 가져오기
  const { data: currentUser, isLoading: isUserLoading } = useGetUserInfoQuery();

  // 관리자인지 여부 확인
  const isAdmin = currentUser?.role === 'admin';

  const { data, isLoading, error } = useGetPostsQuery({ page: 1, limit: 100 });
  const [deletePost] = useDeletePostMutation();

  // 테이블 데이터 구성
  const tableData: PostData[] = useMemo(() => {
    if (!data) return [];

    return data.data.map((post, index) => {
      return {
        id: post.id,
        No: index + 1,
        title: post.title,
        accountUsername: post.accountUsername || post.accountId.split('-')[0],
        viewCount: post.viewCount,
        createdAt: post.createdAt,
      };
    });
  }, [data]);

  const textFilter: FilterFn<PostData> = (row, columnId, filterValue) => {
    const rowValue = row.getValue<unknown>(columnId);
    if (typeof rowValue === 'string') {
      return rowValue.toLowerCase().includes(filterValue.toLowerCase());
    }
    if (typeof rowValue === 'number') {
      return rowValue.toString().includes(filterValue);
    }
    return false;
  };

  // 선택된 행의 ID를 저장
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // 테이블 생성
  const columns = useMemo<ColumnDef<PostData>[]>(() => {
    const cols: ColumnDef<PostData>[] = [
      {
        accessorKey: 'No',
        header: 'No',
        cell: ({ row }) => {
          const totalRows = tableData.length;
          return <div className="text-center">{totalRows - row.index}</div>;
        },
        enableSorting: false,
      },
      {
        accessorKey: 'title',
        header: '제목',
        cell: ({ row }) => (
          <div className="text-center line-clamp-1">{row.getValue('title')}</div>
        ),
        filterFn: textFilter,
        enableGlobalFilter: true,
        enableSorting: false,
      },
      {
        accessorKey: 'accountUsername',
        header: '작성자',
        cell: ({ row }) => (
          <div className="text-center line-clamp-1">{row.getValue('accountUsername')}</div>
        ),
        enableGlobalFilter: false,
      },
      {
        accessorKey: 'viewCount',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            조회수
            <CaretSortIcon className="h-4 w-4 " />
          </Button>
        ),
        cell: ({ row }) => <div className="text-center">{row.getValue('viewCount')}</div>,
        enableSorting: true,
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            작성일
            <CaretSortIcon className="h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-center">
            {new Date(row.getValue('createdAt')).toLocaleDateString()}
          </div>
        ),
        enableSorting: true,
      },
    ];

    if (isAdmin) {
      cols.unshift({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            onClick={(event) => event.stopPropagation()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            onClick={(event) => event.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }

    return cols;
  }, [isAdmin, tableData.length]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: textFilter,
    enableRowSelection: isAdmin,
    manualPagination: false,
    initialState: {
      pagination: {
        pageSize: 15, // 페이지 당 행 수 설정
      },
    },
  });

  // 선택된 행의 ID 업데이트
  useEffect(() => {
    const selectedIds = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map((key) => table.getRowModel().rowsById[key].original.id);
    setSelectedRows(selectedIds);
  }, [rowSelection, table]);

  // 선택된 게시물 삭제 함수
  const handleDeleteSelected = async () => {
    if (window.confirm('선택한 게시물을 삭제하시겠습니까?')) {
      try {
        await Promise.all(selectedRows.map((id) => deletePost(id).unwrap()));
        // 삭제 후 선택된 행 초기화 및 데이터 재요청
        table.resetRowSelection();
      } catch (error) {
        console.error('Failed to delete posts:', error);
      }
    }
  };

  const handleFilterChange = useMemo(
    () =>
      debounce((value: string) => {
        setGlobalFilter(value);
      }, 300),
    [],
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setColumnVisibility({
        createdAt: width > 768,
        viewCount: width > 480,
        accountUsername: width > 400,
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isLoading || isUserLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  // 페이지 번호 생성 함수
  const generatePageButtons = () => {
    const pageCount = table.getPageCount();
    const pageIndex = table.getState().pagination.pageIndex;

    const visiblePageButtonCount = 5; // 최대 표시할 페이지 번호 수
    let startPage = Math.max(pageIndex - Math.floor(visiblePageButtonCount / 2), 0);
    let endPage = startPage + visiblePageButtonCount;

    if (endPage > pageCount) {
      endPage = pageCount;
      startPage = Math.max(endPage - visiblePageButtonCount, 0);
    }

    const pageButtons = [];
    for (let i = startPage; i < endPage; i++) {
      pageButtons.push(
        <Button
          key={i}
          variant={i === pageIndex ? 'default' : 'outline'}
          size="sm"
          onClick={() => table.setPageIndex(i)}
        >
          {i + 1}
        </Button>,
      );
    }

    return (
      <>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronFirst />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>
        {startPage > 0 && <span className="px-2">...</span>}
        {pageButtons}
        {endPage < pageCount && <span className="px-2">...</span>}
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronLast />
        </Button>
      </>
    );
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-5xl">
        <section className="flex items-center py-4 justify-between">
          <Input
            placeholder="제목으로 검색..."
            onChange={(event) => {
              handleFilterChange(event.target.value);
            }}
            className="max-w-sm"
          />
          <Button variant="default" className="ml-2" onClick={() => navigate('/posts/new')}>
            글 작성
          </Button>
          {isAdmin && (
            <Button
              variant="destructive"
              className="ml-2"
              onClick={handleDeleteSelected}
              disabled={selectedRows.length === 0}
            >
              선택 삭제
            </Button>
          )}
        </section>
        <section className="rounded-md border overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-center px-2 py-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={() => navigate(`/posts/${row.original.id}`)}
                    className="cursor-pointer transition-colors h-10"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center px-2 py-1">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>

        <section className="flex items-center justify-center space-x-2 py-4">
          {generatePageButtons()}
        </section>
      </div>
    </div>
  );
}
