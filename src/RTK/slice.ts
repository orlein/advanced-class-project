import { createSlice } from '@reduxjs/toolkit';
import { signIn, signOut, signUp } from './thunk';
import { ExtraUserInfo, UserEmailAndPassword } from '@/lib/interfaces/userInfoInterfaces';

interface AuthState {
  isSignedIn: boolean;
  userSignInInfo: UserEmailAndPassword | null;
  user: ExtraUserInfo | null;
  error: string | null;
}

const initialState: AuthState = {
  isSignedIn: false,
  userSignInInfo: null,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
          ...action.payload.signedInUser,
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
        state.userSignInInfo = action.payload.userData;
        state.isSignedIn = true;
      })
      .addCase(signOut.fulfilled, state => {
        (state.user = null), (state.isSignedIn = false);
      });
  },
});

export default authSlice;
