import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice';

export const store = configureStore({ reducer: authSlice.reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
