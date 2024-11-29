import { z } from 'zod';
import { metaSchema } from '../metaSchema';

export const challengeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  challengeImageUrl: z.string(),
  type: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  accountId: z.string(),
  isDeleted: z.boolean(),
  isPublished: z.boolean(),
  isFinished: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  accountUsername: z.string(),
  likeCount: z.number(),
  dislikeCount: z.number(),
  pureLikeCount: z.number(),
  controversialCount: z.number(),
  challengeEventCount: z.number(),
  challengeParticipantCount: z.number(),
  challengeEventCheckedParticipantsFraction: z.number(),
});

export const newChallengeRequestSchema = challengeSchema.pick({
  title: true,
  description: true,
  type: true,
  startDate: true,
  endDate: true,
  isDeleted: true,
  isPublished: true,
  isFinished: true,
});

export const newChallengeFormSchema = challengeSchema
  .pick({
    title: true,
    description: true,
  })
  .extend({
    startDate: z.date() || z.number() || z.undefined(),
    endDate: z.date() || z.number() || z.undefined(),
  })
  .refine(data => data.startDate < data.endDate, {
    message: '종료 일자는 시작 일자보다 이후로 설정하세요.',
  });

export const updateChallengeImageRequestSchema = z.object({
  updateData: challengeSchema.pick({ challengeImageUrl: true }),
  challengeId: z.string(),
});

export const getChallengesResponseSchema = z.object({
  data: z.array(challengeSchema),
  meta: metaSchema,
});

export const updateChallengeRequestSchema = z.object({
  updateData: newChallengeRequestSchema.extend({ challengeImageUrl: z.string() }),
  challengeId: z.string(),
});

export const challengeIdSchema = challengeSchema.pick({ id: true });

export const joinChallengeResponseSchema = challengeSchema
  .pick({
    id: true,
    accountId: true,
    isDeleted: true,
    isFinished: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({ challengeId: z.string(), isWinner: z.boolean() });

export const challengeLikeStatusResponseSchema = z.object({
  id: z.string(),
  postId: z.string(),
  accountId: z.string(),
  challengeId: z.string(),
  challengeEventId: z.string(),
  type: z.string(),
  count: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
