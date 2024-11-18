import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice';
import { postsApi } from '@/features/posts/postsApi';
import accountApi, { authApi } from '@/api/accountApi';
import imageApi from '@/api/imageApi';

export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      accountApi.middleware,
      postsApi.middleware,
      authApi.middleware,
      imageApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
