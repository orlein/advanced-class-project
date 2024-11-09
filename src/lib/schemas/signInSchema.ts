import { z } from 'zod';
import { emailSchema } from './emailSchema';
import { passwordSchema } from './passwordSchema';

export const signInSchema = z.object({
  ...emailSchema.shape,
  ...passwordSchema.shape,
  isEmailToBeSaved: z.boolean().default(false).optional(),
});
