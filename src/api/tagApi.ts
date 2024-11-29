import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { NewTagRequestData, TagData } from '@/types/tag';
import { Meta } from '@/types/meta';
import { PaginationParams } from '@/types/paginationParams';

const tagApi = createApi({
  reducerPath: 'tagApi',
  baseQuery: baseQuery,
  endpoints: builder => ({
    addNewTag: builder.mutation<TagData, NewTagRequestData>({
      query: tagData => ({
        url: 'tags',
        method: 'POST',
        body: tagData,
      }),
    }),
    getTagList: builder.query<{ data: TagData[]; meta: Meta }, PaginationParams>({
      query: ({ page = 1, limit = 10, sortBy = 'name', order = 'asc' }) => ({
        url: `tags?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`,
        method: 'GET',
      }),
    }),
    getTagInfo: builder.query<TagData, { tagId: string }>({
      query: ({ tagId }) => ({
        url: `tags/${tagId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useAddNewTagMutation, useGetTagListQuery, useGetTagInfoQuery } = tagApi;
export default tagApi;
