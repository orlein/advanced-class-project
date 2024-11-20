import {
  PostRequestData,
  PostsResponseData,
  MetaData,
  LikeResponseData,
  PostLikeStatusResponseData,
  DeleteLikeResponseData,
} from '@/types/post';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: baseQuery,
  tagTypes: ['Posts'],
  endpoints: builder => ({
    getPosts: builder.query<
      { data: PostsResponseData[]; meta: MetaData },
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => `posts?page=${page}&limit=${limit}`,
      providesTags: result =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Posts' as const, id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    getPostById: builder.query<PostsResponseData, string>({
      query: id => `posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Posts', id }],
    }),
    createPost: builder.mutation<PostsResponseData, PostRequestData>({
      query: body => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    updatePost: builder.mutation<PostsResponseData, { id: string; data: PostRequestData }>({
      query: ({ id, data }) => ({
        url: `posts/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Posts', id }],
    }),
    deletePost: builder.mutation<void, string>({
      query: id => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    likePost: builder.mutation<LikeResponseData, string>({
      query: postId => ({
        url: `posts/${postId}/like`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, postId) => [{ type: 'Posts', id: postId }],
    }),
    unlikePost: builder.mutation<DeleteLikeResponseData, string>({
      query: postId => ({
        url: `posts/${postId}/like`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, postId) => [{ type: 'Posts', id: postId }],
    }),
    getLikeStatus: builder.query<PostLikeStatusResponseData, { postId: string }>({
      query: ({ postId }) => ({
        url: `/posts/${postId}/like-status`,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled.then(console.log);
        } catch (err: any) {
          throw new Error(`\n🚨 getLikeStatus Error! \nError Status: ${err.error.status}`);
        }
      },
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
