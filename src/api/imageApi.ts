import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const imageApi = createApi({
  reducerPath: 'imageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ozadv6.beavercoding.net/api',
    prepareHeaders: headers => {
      const token = sessionStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      headers.set('accept', 'application/json');
      return headers;
    },
  }),
  endpoints: builder => ({
    uploadImage: builder.mutation<{ url: string }, FormData>({
      query: imageData => ({
        url: 'files/upload',
        method: 'POST',
        body: imageData,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err: any) {
          throw new Error(`\n🚨 uploadImage Error! \nError Status: ${err.error.status}`);
        }
      },
    }),
  }),
});

export const { useUploadImageMutation } = imageApi;
export default imageApi;
