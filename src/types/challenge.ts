import {
  challengeIdSchema,
  challengeLikeStatusResponseSchema,
  challengeSchema,
  getChallengesResponseSchema,
  joinChallengeResponseSchema,
  newChallengeFormSchema,
  newChallengeRequestSchema,
  updateChallengeImageRequestSchema,
  updateChallengeRequestSchema,
} from '@/lib/schemas/challengeSchema';
import { z } from 'zod';

export type ChallengeData = z.infer<typeof challengeSchema>;
export type NewChallengeRequestData = z.infer<typeof newChallengeRequestSchema>;
export type NewChallengeFormData = z.infer<typeof newChallengeFormSchema>;
export type UpdateChallengeImageRequestData = z.infer<typeof updateChallengeImageRequestSchema>;
export type GetChallengesResponseData = z.infer<typeof getChallengesResponseSchema>;
export type UpdateChallengeRequestData = z.infer<typeof updateChallengeRequestSchema>;
export type ChallengeIdData = z.infer<typeof challengeIdSchema>;
export type JoinChallengeResponseData = z.infer<typeof joinChallengeResponseSchema>;
export type ChallengeLikeStatusResponseData = z.infer<typeof challengeLikeStatusResponseSchema>;

export type ChallengeSortBy = 'endDate' | 'likeCount' | 'challengeParticipantCount';
export type ChallengeSortOrder = Record<ChallengeSortBy, 'asc' | 'desc'>;
