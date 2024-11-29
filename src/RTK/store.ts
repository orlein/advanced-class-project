import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice';
import postsApi from '@/api/postsApi';
import accountApi from '@/api/accountApi';
import imageApi from '@/api/imageApi';
import challengeApi from '@/api/challengeApi';
import commentsApi from '@/api/commentsApi';
import tagApi from '@/api/tagApi';

export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [challengeApi.reducerPath]: challengeApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      accountApi.middleware,
      postsApi.middleware,
      imageApi.middleware,
      challengeApi.middleware,
      commentsApi.middleware,
      tagApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
