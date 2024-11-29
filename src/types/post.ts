import { z } from 'zod';
import {
  postRequestSchema,
  postSchema,
  likeResponseSchema,
  postLikeStatusResponseSchema,
  postLikeStatusRequestSchema,
  deleteLikeResponseSchema,
} from '../lib/schemas/postSchema';

export type PostsResponseData = z.infer<typeof postSchema>;
export type PostRequestData = z.infer<typeof postRequestSchema>;
export type LikeResponseData = z.infer<typeof likeResponseSchema>;
export type PostLikeStatusRequestData = z.infer<typeof postLikeStatusRequestSchema>;
export type PostLikeStatusResponseData = z.infer<typeof postLikeStatusResponseSchema>;
export type DeleteLikeResponseData = z.infer<typeof deleteLikeResponseSchema>;
