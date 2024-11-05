import { z } from "zod";

export const notificationsFormSchema = z.object({
  all_notifications: z.boolean().default(true),
  new_comments: z.boolean().default(true),
  replies_to_comments: z.boolean().default(true),
  post_recommendations: z.boolean().default(true),
  mentions: z.boolean().default(true),
  new_challenges: z.boolean().default(true),
  challenge_updates: z.boolean().default(true),
  challenge_completion: z.boolean().default(true),
  challenge_events: z.boolean().default(true),
  new_followers: z.boolean().default(true),
  likes_on_comments: z.boolean().default(true),
  profile_updates: z.boolean().default(true),
  password_changes: z.boolean().default(true),
  security_alerts: z.boolean().default(true),
  event_promotions: z.boolean().default(true),
  newsletters: z.boolean().default(true),
  direct_messages: z.boolean().default(true),
  system_announcements: z.boolean().default(true),
  email_notifications: z.boolean().default(true),
});

export type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

export const defaultNotificationValues = notificationsFormSchema.parse({});
