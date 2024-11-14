import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice';
import { postsApi } from '@/features/posts/postsApi';
import accountApi from '@/api/accountApi';

export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(accountApi.middleware).concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
