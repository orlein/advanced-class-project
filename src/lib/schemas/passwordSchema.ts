import { z } from 'zod';

export const passwordSchema = z.object({
  password: z
    .string()
    .trim()
    .nonempty('비밀번호를 입력해 주세요.')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,15}$/g, {
      message: '비밀번호를 확인해 주세요.',
    }),
});
