import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo, signIn, signUp } from './thunk';
import { ExtraUserInfo } from '@/lib/interfaces/userInfoInterfaces';

interface AuthState {
  isSignedIn: boolean;
  user: ExtraUserInfo | null;
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
    signOut: state => {
      localStorage.removeItem('accessToken');
      state.user = null;
      state.isSignedIn = false;
    },
    updateUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.error = null;
      })
      .addCase(signUp.fulfilled, state => {
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const userInfo = {
          ...action.payload,
          username: '',
          birthday: '',
          mainLanguage: '',
          location: '',
          bio: '',
          externalUrl: '',
          interests: '',
          profileImageUrl: '',
        };
        state.user = userInfo;
        state.isSignedIn = true;
      });
  },
});

export default authSlice;
