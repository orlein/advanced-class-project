import { z } from 'zod';

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: '이메일 주소를 입력해 주세요' })
    .email({ message: '이메일 주소를 확인해 주세요.' }),
});
