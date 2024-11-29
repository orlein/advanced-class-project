import { newTagRequestSchema, tagSchema } from '@/lib/schemas/tagSchema';
import { z } from 'zod';

export type TagData = z.infer<typeof tagSchema>;
export type NewTagRequestData = z.infer<typeof newTagRequestSchema>;
