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
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err: any) {
          if (err.error.status === 409) throw new Error('이미 가입한 이메일입니다.');
        }
      },
    }),
    signIn: builder.mutation<SignInResponseData, SignInRequestData>({
      query: userData => ({
        url: '/accounts/sign-in',
        method: 'POST',
        body: userData,
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setLoggedIn(data));
            dispatch(accountApi.endpoints.getUserInfo.initiate(undefined, { forceRefetch: true }));
          }
        } catch (err: any) {
          throw new Error(`\n🚨 signIn Error! \nError Status: ${err.error.status}`);
        }
      },
    }),
    getUserInfo: builder.query<UserInfoData, void>({
      query: () => ({
        url: '/accounts/me',
        method: 'GET',
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          data && dispatch(setUser({ ...data }));
        } catch (err: any) {
          throw new Error(`\n🚨 getUserInfo Error! \nError Status: ${err.error.status}`);
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
        try {
          const { data } = await queryFulfilled;
          data && dispatch(setUser({ ...data }));
        } catch (err: any) {
          throw new Error(`\n🚨 updateUserInfo Error! \nError Status: ${err.error.status}`);
        }
      },
    }),
    getAnotherUserInfo: builder.query<UserInfoData, string>({
      query: id => ({
        url: `/accounts/${id}`,
        method: 'GET',
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled.then(console.log);
        } catch (err: any) {
          throw new Error(`\n🚨 getAnotherUserInfo Error! \nError Status: ${err.error.status}`);
        }
      },
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
