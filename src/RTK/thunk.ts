import { onAuthStateChange } from '@/api/FakeAuthApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import authSlice from './slice';

export const updateLoginState = createAsyncThunk(
  'auth/updateLoginState',
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const isCurrentlySignedIn = state.isSignedIn;
    isCurrentlySignedIn && dispatch(authSlice.actions.signOut());
    !isCurrentlySignedIn && dispatch(authSlice.actions.signIn());
    return onAuthStateChange(!isCurrentlySignedIn);
  }
);
