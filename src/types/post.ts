import { z } from 'zod';
import {
  postRequestSchema,
  postSchema,
  metaSchema,
  likeResponseSchema,
  likeStatusResponseSchema,
  likeStatusRequestSchema,
  deleteLikeResponseSchema,
} from '../lib/schemas/postSchema';

export type PostsResponseData = z.infer<typeof postSchema>;
export type MetaData = z.infer<typeof metaSchema>;
export type PostRequestData = z.infer<typeof postRequestSchema>;
export type LikeResponseData = z.infer<typeof likeResponseSchema>;
export type LikeStatusRequestData = z.infer<typeof likeStatusRequestSchema>;
export type LikeStatusResponseData = z.infer<typeof likeStatusResponseSchema>;
export type DeleteLikeResponseData = z.infer<typeof deleteLikeResponseSchema>;
