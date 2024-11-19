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

export const metaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  isLastPage: z.boolean(),
});

export const postRequestSchema = postSchema.pick({
  title: true,
  content: true,
  contentType: true,
  externalLink: true,
  isDeleted: true,
  type: true,
  isCommentAllowed: true,
  isLikeAllowed: true,
  challengeId: true,
});

export const likeResponseSchema = postSchema.omit({
  accountId: true,
  accountUsername: true,
  likeCount: true,
  dislikeCount: true,
  commentCount: true,
  pureLikeCount: true,
});

export const likeStatusRequestSchema = z.object({
  id: z.string(),
  postId: z.string(),
});

export const likeStatusResponseSchema = likeStatusRequestSchema.extend({
  accountId: z.string(),
  commentId: z.string(),
  challengeId: z.string(),
  challengeEventId: z.string(),
  type: z.string().default('like'),
  count: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const deleteLikeResponseSchema = postSchema.omit({
  accountUsername: true,
  likeCount: true,
  dislikeCount: true,
  commentCount: true,
  pureLikeCount: true,
});
