import { z } from 'zod';

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,15}$/g;

export const userSchema = z.object({
  id: z.string(),
  email: z
    .string()
    .trim()
    .nonempty({ message: '이메일 주소를 입력해 주세요' })
    .email({ message: '이메일 주소를 확인해 주세요.' }),
  isEmailVerified: z.boolean(),
  isPrivate: z.boolean(),
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  username: z.string(),
  birthday: z.string(),
  mainLanguage: z.string(),
  location: z.string(),
  bio: z.string(),
  interests: z.string(),
  profileImageUrl: z.string(),
  currentPassword: z.string().trim().nonempty('비밀번호를 입력해 주세요.').regex(passwordRegex, {
    message: '비밀번호를 확인해 주세요.',
  }),
  password: z.string().trim().nonempty('비밀번호를 입력해 주세요.').regex(passwordRegex, {
    message: '비밀번호를 확인해 주세요.',
  }),
  confirmPassword: z.string().trim().nonempty('비밀번호를 입력해 주세요.').regex(passwordRegex, {
    message: '비밀번호를 확인해 주세요.',
  }),
});

export const passwordSchema = userSchema.pick({ password: true });

export const emailSchema = userSchema.pick({ email: true });

export const signUpRequestSchema = userSchema
  .pick({
    email: true,
    password: true,
    confirmPassword: true,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export const signInRequestSchema = userSchema.pick({ email: true, password: true });

export const signInFormSchema = signInRequestSchema.extend({
  isEmailToBeSaved: z.boolean().default(false).optional(),
});

export const resetPasswordSchema = userSchema
  .pick({
    currentPassword: true,
    password: true,
    confirmPassword: true,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export const profileSchema = userSchema.pick({
  id: true,
  username: true,
  bio: true,
  location: true,
  isPrivate: true,
  profileImageUrl: true,
});

export const signInResponseSchema = userSchema.pick({
  id: true,
  email: true,
  isEmailVerified: true,
  isPrivate: true,
  role: true,
  createdAt: true,
  updatedAt: true,
});

export const userInfoSchema = userSchema.omit({
  currentPassword: true,
  password: true,
  confirmPassword: true,
});
