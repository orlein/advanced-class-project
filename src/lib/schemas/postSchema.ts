import { z } from 'zod';

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  contentType: z.string(),
  externalLink: z.string().optional(),
  isDeleted: z.boolean(),
  type: z.string().default('post'),
  isCommentAllowed: z.boolean(),
  isLikeAllowed: z.boolean(),
  challengeId: z.string().optional(),
  viewCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  accountId: z.string(),
  accountUsername: z.string(),
  likeCount: z.number(),
  dislikeCount: z.number(),
  commentCount: z.number(),
  pureLikeCount: z.number(),
});

export const postRequestSchema = postSchema.pick({
  title: true,
  content: true,
  contentType: true,
  externalLink: true,
  isCommentAllowed: true,
  isLikeAllowed: true,
  challengeId: true,
});

export const metaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export const postLikeStatusRequestSchema = z.object({
  id: z.string(),
  postId: z.string(),
});

export const postLikeStatusResponseSchema = postLikeStatusRequestSchema.extend({
  accountId: z.string(),
  commentId: z.string(),
  challengeId: z.string(),
  challengeEventId: z.string(),
  type: z.string().default('like'),
  count: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const likeResponseSchema = z.object({
  message: z.string(),
  likeCount: z.number(),
});

export const deleteLikeResponseSchema = z.object({
  message: z.string(),
});
