import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice';
import { postsApi } from '@/api/postsApi';
import accountApi from '@/api/accountApi';
import imageApi from '@/api/imageApi';
import challengeApi from '@/api/challengeApi';

export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [challengeApi.reducerPath]: challengeApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      accountApi.middleware,
      postsApi.middleware,
      imageApi.middleware,
      challengeApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
