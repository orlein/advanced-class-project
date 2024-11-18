import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

const imageApi = createApi({
  reducerPath: 'imageApi',
  baseQuery: baseQuery,
  tagTypes: ['imageUpload'],
  endpoints: builder => ({
    uploadImage: builder.mutation<{ url: string }, FormData>({
      query: imageData => ({
        url: 'files/upload',
        method: 'POST',
        body: imageData,
      }),
      invalidatesTags: ['imageUpload'],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err);
          throw new Error(`\n🚨 uploadImage Error! \nError Status: ${err.error.status}`);
        }
      },
    }),
  }),
});

export const { useUploadImageMutation } = imageApi;
export default imageApi;
