import { z } from 'zod';

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
  externalUrl: z.string(),
  interests: z.string(),
  profileImageUrl: z.string(),
});

export const profileSchema = z.object({
  id: z.string(),
  username: z.string().nonempty(),
  bio: z.string(),
  // interests: z.string(),
  location: z.string(),
  isPrivate: z.boolean(),
  profileImageUrl: z.string(),
});

export type ProfileFields = z.infer<typeof profileSchema>;
