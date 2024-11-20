import { z } from 'zod';
import {
  commentSchema,
  commentRequestSchema,
  commentUpdateRequestSchema,
} from '@/lib/schemas/commentSchema';

export type Comment = z.infer<typeof commentSchema>;
export type CommentRequest = z.infer<typeof commentRequestSchema>;
export type CommentUpdateRequest = z.infer<typeof commentUpdateRequestSchema>;
