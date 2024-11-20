import { z } from 'zod';

export const commentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  accountId: z.string(),
  content: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  likeCount: z.number(),
  dislikeCount: z.number(),
  pureLikeCount: z.number(),
  accountUsername: z.string(),
});

export const commentRequestSchema = z.object({
  content: z.string(),
});

export const commentUpdateRequestSchema = z.object({
  content: z.string(),
});
