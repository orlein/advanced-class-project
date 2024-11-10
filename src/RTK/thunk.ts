import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  UserEmailAndPassword,
  SignUpUser,
  UserBasicInfo,
  ExtraUserInfo,
} from '@/lib/interfaces/userInfoInterfaces';
import SupabaseApi from '@/api/SupabaseApi';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData: SignUpUser, { rejectWithValue }) => {
    try {
      await SupabaseApi.signUp(userData);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const signIn = createAsyncThunk<UserBasicInfo, UserEmailAndPassword>(
  'auth/signIn',
  async userData => {
    const signedInUser = await SupabaseApi.signIn(userData);
    return signedInUser;
  },
);
