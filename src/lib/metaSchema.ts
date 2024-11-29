import { z } from 'zod';

export const metaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  isLastPage: z.boolean(),
});
