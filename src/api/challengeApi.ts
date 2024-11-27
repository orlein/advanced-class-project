import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import {
  ChallengeData,
  ChallengeLikeStatusResponseData,
  GetChallengesResponseData,
  JoinChallengeResponseData,
  NewChallengeRequestData,
  UpdateChallengeImageRequestData,
  UpdateChallengeRequestData,
} from '@/types/challenge';
import { UserInfoData } from '@/types/userData';

const challengeApi = createApi({
  reducerPath: 'challengeApi',
  baseQuery: baseQuery,
  tagTypes: ['challenge'],
  endpoints: builder => ({
    getChallenges: builder.query<
      GetChallengesResponseData,
      { page?: string; limit?: string; sortBy?: string; order?: 'asc' | 'desc' }
    >({
      query: ({ page = '1', limit = '20', sortBy = 'endDate', order = 'asc' }) => ({
        url: `/challenges?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`,
        method: 'GET',
      }),
      providesTags: ['challenge'],
    }),
    getChallengeInfo: builder.query<ChallengeData, { challengeId: string }>({
      query: ({ challengeId }) => ({
        url: `/challenges/${challengeId}`,
        method: 'GET',
      }),
      providesTags: ['challenge'],
    }),
    createNewChallenge: builder.mutation<ChallengeData, NewChallengeRequestData>({
      query: challengeData => ({
        url: '/challenges',
        method: 'POST',
        body: challengeData,
      }),
      invalidatesTags: ['challenge'],
    }),
    updateChallengeImage: builder.mutation<ChallengeData, UpdateChallengeImageRequestData>({
      query: ({ challengeId, updateData }) => ({
        url: `/challenges/${challengeId}`,
        method: 'PATCH',
        body: updateData,
      }),
      invalidatesTags: ['challenge'],
    }),
    updateChallenge: builder.mutation<ChallengeData, UpdateChallengeRequestData>({
      query: ({ challengeId, updateData }) => ({
        url: `/challenges/${challengeId}`,
        method: 'PATCH',
        body: updateData,
      }),
      invalidatesTags: ['challenge'],
    }),
    deleteChallenge: builder.mutation<void, { challengeId: string }>({
      query: ({ challengeId }) => ({
        url: `/challenges/${challengeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['challenge'],
    }),
    likeChallenge: builder.mutation<ChallengeData, { challengeId: string }>({
      query: ({ challengeId }) => ({
        url: `/challenges/${challengeId}/like`,
        method: 'POST',
      }),
    }),
    cancelLikeChallenge: builder.mutation<ChallengeData, { challengeId: string }>({
      query: ({ challengeId }) => ({
        url: `/challenges/${challengeId}/like`,
        method: 'Delete',
      }),
    }),
    challengeLikeStatus: builder.query<ChallengeLikeStatusResponseData, { challengeId: string }>({
      query: ({ challengeId }) => ({
        url: `/challenges/${challengeId}/like-status`,
        method: 'GET',
      }),
    }),
    getChallengeMembers: builder.query<UserInfoData[], { challengeId: string }>({
      query: ({ challengeId }) => ({
        url: `/challenges/${challengeId}/member`,
        method: 'GET',
      }),
    }),
    joinChallenge: builder.mutation<JoinChallengeResponseData, { challengeId: string }>({
      query: ({ challengeId }) => ({
        url: `/challenges/${challengeId}/member`,
        method: 'POST',
      }),
    }),
    quitChallenge: builder.mutation<void, { challengeId: string }>({
      query: ({ challengeId }) => ({
        url: `/challenges/${challengeId}/member`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetChallengesQuery,
  useGetChallengeInfoQuery,
  useCreateNewChallengeMutation,
  useUpdateChallengeImageMutation,
  useUpdateChallengeMutation,
  useDeleteChallengeMutation,
  useLikeChallengeMutation,
  useCancelLikeChallengeMutation,
  useChallengeLikeStatusQuery,
  useGetChallengeMembersQuery,
  useJoinChallengeMutation,
  useQuitChallengeMutation,
} = challengeApi;
export default challengeApi;
