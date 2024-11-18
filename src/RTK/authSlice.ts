import { SignInResponseData, UserInfoData } from '@/types/userData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isSignedIn: boolean;
  user: UserInfoData | null;
  error: string | null;
}

const initialState: AuthState = {
  isSignedIn: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<SignInResponseData>) => {
      state.isSignedIn = true;
      sessionStorage.setItem('userId', action.payload.account.id);
      sessionStorage.setItem('accessToken', action.payload.accessToken);
    },
    setUser: (state, action: PayloadAction<UserInfoData>) => {
      state.user = action.payload;
      state.isSignedIn = true;
    },
    clearUser: state => {
      sessionStorage.clear();
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
