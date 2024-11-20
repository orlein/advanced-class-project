'use client';

import { useMemo, useState, useEffect } from 'react';
import { CaretSortIcon, ChevronDownIcon } from '@radix-ui/react-icons';
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

  const { data, isLoading, error } = useGetPostsQuery({ page: 1, limit: 20 });
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
        cell: ({ row }) => <div className="text-center line-clamp-1">{row.getValue('title')}</div>,
        filterFn: textFilter,
        enableGlobalFilter: true,
        enableSorting: false,
      },
      {
        accessorKey: 'accountUsername',
        header: '작성자',
        cell: ({ row }) => <div className="text-center line-clamp-1">{row.getValue('accountUsername')}</div>,
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

    // 관리자인 경우 체크박스 열 추가
    if (isAdmin) {
      cols.unshift({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            onClick={event => event.stopPropagation()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={value => row.toggleSelected(!!value)}
            aria-label="Select row"
            onClick={event => event.stopPropagation()}
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
  });

  // 선택된 행의 ID 업데이트
  useEffect(() => {
    const selectedIds = Object.keys(rowSelection)
      .filter(key => rowSelection[key])
      .map(key => table.getRowModel().rowsById[key].original.id);
    setSelectedRows(selectedIds);
  }, [rowSelection, table]);

  // 선택된 게시물 삭제 함수
  const handleDeleteSelected = async () => {
    if (window.confirm('선택한 게시물을 삭제하시겠습니까?')) {
      try {
        await Promise.all(selectedRows.map(id => deletePost(id).unwrap()));
        // 삭제 후 선택된 행 초기화 및 데이터 재요청
        table.resetRowSelection();
      } catch (error) {
        console.error('Failed to delete posts:', error);
      }
    }
  };

  // 필터 입력 시 딜레이 적용
  const handleFilterChange = useMemo(
    () =>
      debounce((value: string) => {
        setGlobalFilter(value);
      }, 300),
    [],
  );

  if (isLoading || isUserLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-5xl">
        <section className="flex items-center py-4">
          <Input
            placeholder="제목으로 검색..."
            onChange={event => {
              handleFilterChange(event.target.value);
            }}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" aria-label="Columns">
              {table
                .getAllColumns()
                .filter(column => column.getCanHide())
                .map(column => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={value => column.toggleVisibility(value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          {isAdmin && (
            <>
              <Button
                variant="destructive"
                className="ml-2"
                onClick={handleDeleteSelected}
                disabled={selectedRows.length === 0}
              >
                선택 삭제
              </Button>
              <Button variant="default" className="ml-2" onClick={() => navigate('/posts/new')}>
                글 작성
              </Button>
            </>
          )}
          {!isAdmin && (
            <Button variant="default" className="ml-2" onClick={() => navigate('/posts/new')}>
              글 작성
            </Button>
          )}
        </section>
        <section className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className="">
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id} className="text-center">
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
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={() => navigate(`/posts/${row.original.id}`)}
                    className="cursor-pointer transition-colors"
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className="text-center">
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
        <section className="flex items-center justify-end space-x-2 py-4">
          {isAdmin && (
            <section className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} /{' '}
              {table.getFilteredRowModel().rows.length} 행 선택됨.
            </section>
          )}
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              이전
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              다음
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
