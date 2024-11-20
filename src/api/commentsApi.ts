import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { Comment, CommentRequest, CommentUpdateRequest } from '@/types/commentTypes';

const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: baseQuery,
  tagTypes: ['Comments'],
  endpoints: builder => ({
    // 댓글 목록 조회
    getCommentsByPostId: builder.query<
      { data: Comment[]; meta: any },
      { postId: string; page?: number; limit?: number }
    >({
      query: ({ postId, page = 1, limit = 10 }) =>
        `posts/${postId}/comments?page=${page}&limit=${limit}`,
      providesTags: (result, _error, { postId }) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Comments' as const, id })),
              { type: 'Comments', id: `POST_${postId}` },
            ]
          : [{ type: 'Comments', id: `POST_${postId}` }],
    }),
    // 댓글 작성
    createComment: builder.mutation<Comment, { postId: string; data: CommentRequest }>({
      query: ({ postId, data }) => ({
        url: `posts/${postId}/comments`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: 'Comments', id: `POST_${postId}` },
      ],
    }),
    // 댓글 수정
    updateComment: builder.mutation<
      Comment,
      { postId: string; commentId: string; data: CommentUpdateRequest }
    >({
      query: ({ postId, commentId, data }) => ({
        url: `posts/${postId}/comments/${commentId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { commentId }) => [{ type: 'Comments', id: commentId }],
    }),
    // 댓글 삭제
    deleteComment: builder.mutation<void, { postId: string; commentId: string }>({
      query: ({ postId, commentId }) => ({
        url: `posts/${postId}/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { postId, commentId }) => [
        { type: 'Comments', id: commentId },
        { type: 'Comments', id: `POST_${postId}` },
      ],
    }),
    // 댓글 좋아요
    likeComment: builder.mutation<void, { postId: string; commentId: string }>({
      query: ({ postId, commentId }) => ({
        url: `posts/${postId}/comments/${commentId}/like`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, { commentId }) => [{ type: 'Comments', id: commentId }],
    }),
    // 댓글 좋아요 취소
    unlikeComment: builder.mutation<void, { postId: string; commentId: string }>({
      query: ({ postId, commentId }) => ({
        url: `posts/${postId}/comments/${commentId}/like`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { commentId }) => [{ type: 'Comments', id: commentId }],
    }),
    // 댓글 좋아요 상태 조회
    getCommentLikeStatus: builder.query<'like' | null, { postId: string; commentId: string }>({
      query: ({ postId, commentId }) => `posts/${postId}/comments/${commentId}/like-status`,
      transformResponse: (response: any) => {
        return response.type === 'like' ? 'like' : null;
      },
      providesTags: (_result, _error, { commentId }) => [{ type: 'Comments', id: commentId }],
    }),
  }),
});

export const {
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
  useGetCommentLikeStatusQuery,
} = commentsApi;
export default commentsApi;
