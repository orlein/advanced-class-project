import { onAuthStateChange } from '@/api/FakeAuthApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { signIn, signOut } from './slice';
import { User } from '@/RTK/slice';

export const updateLoginState = createAsyncThunk(
  'auth/updateLoginState',
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const isCurrentlySignedIn = state.isSignedIn;
    isCurrentlySignedIn && dispatch(signOut());
    !isCurrentlySignedIn && dispatch(signIn());
    return onAuthStateChange(!isCurrentlySignedIn);
  },
);

export const updateUserInfo = createAsyncThunk('auth/updateUserInfo', async (updatedUser: User) => {
  // 서버에 유저 정보 변경 요청하기

  return updatedUser;
});
