import { z } from 'zod';

export const tagSchema = z.object({
  id: z.string(),
  name: z.string(),
  hslColor: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const newTagRequestSchema = tagSchema.pick({
  name: true,
  hslColor: true,
  description: true,
});
