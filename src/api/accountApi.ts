import {
  ProfileData,
  SignInRequestData,
  SignInResponseData,
  SignUpRequestData,
  UserInfoData,
} from '@/types/userData';
import { setUser, setLoggedIn } from '@/RTK/slice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: headers => {
      const token = sessionStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      headers.set('accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
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
          data && dispatch(setLoggedIn(data));
          dispatch(accountApi.endpoints.getUserInfo.initiate());
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
          data && dispatch(setUser(data));
        } catch (err: any) {
          throw new Error(`\n🚨 getUserInfo Error! \nError Status: ${err.error.status}`);
        }
      },
    }),
    updateUserInfo: builder.mutation<UserInfoData, ProfileData>({
      query: userData => ({
        url: `/accounts/${userData.id}`,
        method: 'PATCH',
        body: userData,
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          data && dispatch(setUser(data));
        } catch (err: any) {
          throw new Error(`\n🚨 updateUserInfo Error! \nError Status: ${err.error.status}`);
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
} = accountApi;
export default accountApi;
