import { onAuthStateChange } from '@/api/FakeAuthApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { signIn, signOut } from './slice';

export const updateLoginState = createAsyncThunk(
  'auth/updateLoginState',
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const isCurrentlySignedIn = state.isSignedIn;
    isCurrentlySignedIn && dispatch(signOut());
    !isCurrentlySignedIn && dispatch(signIn());
    return onAuthStateChange(!isCurrentlySignedIn);
  }
);
