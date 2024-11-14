import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ExtraUserInfo, UserSignInResponse } from '@/lib/interfaces/userInfoInterfaces';

interface AuthState {
  isSignedIn: boolean;
  user: ExtraUserInfo | null;
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isSignedIn: sessionStorage.getItem('accessToken') ? true : false,
  user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')!) : null,
  error: null,
  token: sessionStorage.getItem('accessToken') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<UserSignInResponse>) => {
      state.isSignedIn = true;
      state.token = action.payload.accessToken;
      sessionStorage.setItem('accessToken', action.payload.accessToken);
    },
    setUser: (state, action: PayloadAction<ExtraUserInfo>) => {
      state.user = {
        ...action.payload,
      };
      state.isSignedIn = true;
      sessionStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser: state => {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('user');
      state.user = null;
      state.isSignedIn = false;
    },
    updateUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoggedIn, setUser, clearUser, updateUserInfo } = authSlice.actions;
export default authSlice;
