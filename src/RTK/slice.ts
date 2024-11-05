import { createSlice } from '@reduxjs/toolkit';
import { updateLoginState, updateUserInfo } from './thunk';

export interface User {
  id: string;
  email: string;
  username: string;
  birthday: string;
  mainLanguage: string;
  location: string;
  bio: string;
  externalUrl: string;
  interests: string;
  profileImageUrl: string;
  isPrivate: boolean;
}

interface AuthState {
  isSignedIn: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isSignedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: state => {
      state.isSignedIn = true;
    },
    signOut: state => {
      state.isSignedIn = false;
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateLoginState.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice;
