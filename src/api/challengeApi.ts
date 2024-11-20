import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { ChallengeData, GetChallengesResponseData } from '@/types/challenge';

const challengeApi = createApi({
  reducerPath: 'challengeApi',
  baseQuery: baseQuery,
  tagTypes: ['user'],
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
          throw new Error(`\n🚨 getUserInfo Error! \nError Status: ${err.error.status}`);
        }
      },
      providesTags: ['user'],
    }),
  }),
});

export const { useGetChallengesQuery } = challengeApi;
export default challengeApi;
