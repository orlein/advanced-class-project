import {
  ProfileUpdateRequestData,
  SignInRequestData,
  SignInResponseData,
  SignUpRequestData,
  UserInfoData,
} from '@/types/userData';
import { setUser, setLoggedIn } from '@/RTK/slice';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: baseQuery,
  tagTypes: ['user'],
  endpoints: builder => ({
    signUp: builder.mutation<void, SignUpRequestData>({
      query: userData => ({
        url: '/accounts/sign-up',
        method: 'POST',
        body: userData,
      }),
    }),
    signIn: builder.mutation<SignInResponseData, SignInRequestData>({
      query: userData => ({
        url: '/accounts/sign-in',
        method: 'POST',
        body: userData,
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const { data } = await queryFulfilled;
        if (data) {
          dispatch(setLoggedIn(data));
          dispatch(accountApi.endpoints.getUserInfo.initiate(undefined, { forceRefetch: true }));
        }
      },
    }),
    getUserInfo: builder.query<UserInfoData, void>({
      query: () => ({
        url: '/accounts/me',
        method: 'GET',
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const { data } = await queryFulfilled;
        if (data) {
          dispatch(setUser({ ...data }));
        }
      },
      providesTags: ['user'],
    }),
    updateUserInfo: builder.mutation<UserInfoData, ProfileUpdateRequestData>({
      query: userData => ({
        url: `/accounts/${userData.id}`,
        method: 'PATCH',
        body: userData,
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const { data } = await queryFulfilled;
        if (data) {
          dispatch(setUser({ ...data }));
        }
      },
    }),
    getAnotherUserInfo: builder.query<UserInfoData, { userId: string }>({
      query: ({ userId }) => ({
        url: `/accounts/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useGetAnotherUserInfoQuery,
} = accountApi;
export default accountApi;
