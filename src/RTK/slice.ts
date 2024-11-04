import { createSlice } from '@reduxjs/toolkit';
import { updateLoginState } from './thunk';

interface AuthState {
  isSignedIn: boolean;
  user: { id: string; email: string } | null;
}

const initialState: AuthState = {
  isSignedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state) => {
      state.isSignedIn = true;
    },
    signOut: (state) => {
      state.isSignedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateLoginState.pending, (state) => {
        state.user = null;
      })
      .addCase(updateLoginState.rejected, (state) => {
        state.user = null;
      })
      .addCase(updateLoginState.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice;
