// src/RTK/store.ts

import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice';
import { postsApi } from '@/features/posts/postsApi';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
