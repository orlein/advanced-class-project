import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('accessToken');
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
      providesTags: (_result, _error, id) => [{ type: 'Posts', id }],
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
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Posts', id }],
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    likePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `posts/${id}/like`,
        method: 'POST',
      }),
      // invalidatesTags: (_result, _error, id) => [{ type: 'Posts', id }],
    }),
    unlikePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `posts/${id}/like`,
        method: 'DELETE',
      }),
      // invalidatesTags: (_result, _error, id) => [{ type: 'Posts', id }],
    }),
    getLikeStatus: builder.query<'like' | null, string>({
      query: (id) => `posts/${id}/like-status`,
      providesTags: (_result, _error, id) => [{ type: 'Posts', id }],
      transformResponse: (response: { type: 'like' | 'dislike' | null }) => {
        return response.type === 'like' ? 'like' : null;
      }
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useGetLikeStatusQuery,
} = postsApi;
