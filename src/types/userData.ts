import { z } from 'zod';
import {
  emailSchema,
  passwordSchema,
  profileSchema,
  profileUpdateRequestSchema,
  resetPasswordSchema,
  signInFormSchema,
  signInRequestSchema,
  signInResponseSchema,
  signUpRequestSchema,
  UserInfoOnSidebar,
  userInfoSchema,
} from '../lib/schemas/userInfoSchema';

export type EmailData = z.infer<typeof emailSchema>;
export type PasswordData = z.infer<typeof passwordSchema>;
export type SignUpRequestData = z.infer<typeof signUpRequestSchema>;
export type SignInRequestData = z.infer<typeof signInRequestSchema>;
export type SignInFormData = z.infer<typeof signInFormSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type ProfileData = z.infer<typeof profileSchema>;
export type ProfileUpdateRequestData = z.infer<typeof profileUpdateRequestSchema>;
export type SignInResponseData = {
  account: z.infer<typeof signInResponseSchema>;
  accessToken: string;
  refreshToken: string;
};
export type UserInfoData = z.infer<typeof userInfoSchema>;
export type UserInfoOnSidebarData = z.infer<typeof UserInfoOnSidebar>;
