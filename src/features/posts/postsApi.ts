import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/RTK/store.ts';

export interface Post {
  id: string;
  title: string;
  content: string;
  contentType: string;
  externalLink?: string;
  isDeleted: boolean;
  type: string;
  isCommentAllowed: boolean;
  isLikeAllowed: boolean;
  challengeId?: string;
  viewCount: number;
  accountId: string;
  createdAt: string;
  updatedAt: string;
  likeCount?: number;
  dislikeCount?: number;
}

export interface NewPost {
  title: string;
  content: string;
  contentType: string;
  externalLink?: string;
  isDeleted?: boolean;
  type?: string;
  isCommentAllowed?: boolean;
  isLikeAllowed?: boolean;
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ozadv6.beavercoding.net/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<{ data: Post[]; meta: never }, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => `posts?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ id }) => ({ type: 'Posts' as const, id })),
            { type: 'Posts', id: 'LIST' },
          ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    getPostById: builder.query<Post, string>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    createPost: builder.mutation<Post, NewPost>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    updatePost: builder.mutation<void, { id: string; data: Partial<NewPost> }>({
      query: ({ id, data }) => ({
        url: `posts/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
