import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice';
import accountApi from '@/api/AccountApi';

export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(accountApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
