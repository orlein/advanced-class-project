import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import {
  ChallengeData,
  ChallengeLikeStatusResponseData,
  GetChallengesResponseData,
  JoinChallengeResponseData,
  NewChallengeRequestData,
  UpdateChallengeRequestData,
} from '@/types/challenge';
import { UserInfoData } from '@/types/userData';

const challengeApi = createApi({
  reducerPath: 'challengeApi',
  baseQuery: baseQuery,
  tagTypes: ['challenge'],
  endpoints: builder => ({
    getChallenges: builder.query<ChallengeData[], { page?: string; limit?: string }>({
      query: ({ page = '1', limit = '20' }) => ({
        url: `/challenges?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      transformResponse: (response: GetChallengesResponseData) => response.data,
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err: any) {
          throw new Error(`\n🚨 getChallenges Error! \nError Status: ${err.error.status}`);
        }
      },
      providesTags: ['challenge'],
    }),
    getChallengeInfo: builder.query<ChallengeData, { challengeId: string }>({
      query: ({ challengeId }) => ({
        url: `/challenges/${challengeId}`,
        method: 'GET',
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err: any) {
          throw new Error(`\n🚨 getChallenges Error! \nError Status: ${err.error.status}`);
        }
      },
      providesTags: ['challenge'],
    }),
    createNewChallenge: builder.mutation<ChallengeData, NewChallengeRequestData>({
      query: challengeData => ({
        url: '/challenges',
        method: 'POST',
        body: challengeData,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err: any) {
          throw new Error(`\n🚨 createNewChallenge Error! \nError Status: ${err.error.status}`);
        }
      },
      invalidatesTags: ['challenge'],
    }),
    updateChallenge: builder.mutation<ChallengeData, UpdateChallengeRequestData>({
      query: ({ challengeId, updateData }) => ({
        url: `/challenges/${challengeId}`,
        method: 'PATCH',
        body: updateData,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err: any) {
          throw new Error(`\n🚨 updateChallenge Error! \nError Status: ${err.error.status}`);
        }
      },
      invalidatesTags: ['challenge'],
    }),
    deleteChallenge: builder.mutation<void, { challengeId: string }>({
      query: ({ challengeId }) => ({
        url: `/challenges/${challengeId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err: any) {
          throw new Error(`\n🚨 deleteChallenge Error! \nError Status: ${err.error.status}`);
        }
      },
      invalidatesTags: ['challenge'],
    }),
    likeChallenge: builder.mutation<ChallengeData, { challengeId: string }>({
      query: ({ challengeId }) => ({
        url: `/challenges/${challengeId}/like`,
        method: 'POST',
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err: any) {
          throw new Error(`\n🚨 likeChallenge Error! \nError Status: ${err.error.status}`);
        }
      },
    }),
    cancelLikeChallenge: builder.mutation<ChallengeData, { challengeId: string }>({
      query: ({ challengeId }) => ({
        url: `/challenges/${challengeId}/like`,
        method: 'Delete',
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err: any) {
          throw new Error(`\n🚨 cancelLikeChallenge Error! \nError Status: ${err.error.status}`);
        }
      },
    }),
    challengeLikeStatus: builder.query<ChallengeLikeStatusResponseData, { challengeId: string }>({
      query: ({ challengeId }) => ({
        url: `/challenges/${challengeId}/like-status`,
        method: 'GET',
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err: any) {
          throw new Error(`\n🚨 challengeLikeStatus Error! \nError Status: ${err.error.status}`);
        }
      },
    }),
    getChallengeMembers: builder.query<UserInfoData[], { challengeId: string }>({
      query: ({ challengeId }) => ({
        url: `/challenges/${challengeId}/member`,
        method: 'GET',
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err: any) {
          throw new Error(`\n🚨 getChallengeMembers Error! \nError Status: ${err.error.status}`);
        }
      },
    }),
    joinChallenge: builder.mutation<JoinChallengeResponseData, { challengeId: string }>({
      query: ({ challengeId }) => ({
        url: `/challenges/${challengeId}/member`,
        method: 'POST',
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err: any) {
          throw new Error(`\n🚨 joinChallenge Error! \nError Status: ${err.error.status}`);
        }
      },
    }),
    quitChallenge: builder.mutation<void, { challengeId: string }>({
      query: ({ challengeId }) => ({
        url: `/challenges/${challengeId}/member`,
        method: 'DELETE',
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err: any) {
          throw new Error(`\n🚨 quitChallenge Error! \nError Status: ${err.error.status}`);
        }
      },
    }),
  }),
});

export const {
  useGetChallengesQuery,
  useGetChallengeInfoQuery,
  useCreateNewChallengeMutation,
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
