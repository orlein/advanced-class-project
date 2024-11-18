import { z } from 'zod';

const passwordValidationSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
  .max(15, '비밀번호는 최대 15자 이하여야 합니다.')
  .regex(/(?=.*[A-Za-z])/, '최소 하나 이상의 영문자가 포함되어야 합니다.')
  .regex(/(?=.*\d)/, '최소 하나 이상의 숫자가 포함되어야 합니다.')
  .regex(/^(?!.*(.)\1\1)/, '동일한 문자가 3번 이상 연속될 수 없습니다.');

export const userSchema = z.object({
  id: z.string(),
  email: z
    .string()
    .trim()
    .nonempty({ message: '이메일 주소를 입력해 주세요.' })
    .email({ message: '이메일 주소를 확인해 주세요.' }),
  isEmailVerified: z.boolean(),
  isPrivate: z.boolean(),
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  username: z
    .string()
    .nonempty({ message: '닉네임을 입력해 주세요.' })
    .min(2, { message: '최소 2자 이상이어야 합니다.' })
    .max(20, { message: '최대 20자 이하여야 합니다.' }),
  nationality: z.string().nullable().optional(),
  bio: z.string().max(50, { message: '최대 50자 이하여야 합니다.' }).optional(),
  interests: z.string().optional(),
  profileImageUrl: z.string().optional(),
  currentPassword: passwordValidationSchema,
  password: passwordValidationSchema,
  confirmPassword: passwordValidationSchema,
});

export const passwordSchema = userSchema.pick({ password: true });

export const emailSchema = userSchema.pick({ email: true });

export const signUpRequestSchema = userSchema
  .pick({
    username: true,
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
  username: true,
  bio: true,
  nationality: true,
  isPrivate: true,
  profileImageUrl: true,
});

export const profileUpdateRequestSchema = profileSchema.extend({
  id: z.string(),
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
