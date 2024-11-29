import { metaSchema } from '@/lib/metaSchema';
import { z } from 'zod';

export type Meta = z.infer<typeof metaSchema>;
