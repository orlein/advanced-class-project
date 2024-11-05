"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

import { NotificationSection } from "./NotificationSection";
import { NotificationSwitch } from "./NotificationSwitch";
import {
  NOTIFICATION_SECTION,
  NOTIFICATION_SECTION_LIST,
} from "@/constants/notification";

const notificationsFormSchema = z.object({
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

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

const defaultValues: Partial<NotificationsFormValues> = {
  all_notifications: true,
  new_comments: true,
  replies_to_comments: true,
  post_recommendations: true,
  mentions: true,
  new_challenges: true,
  challenge_updates: true,
  challenge_completion: true,
  challenge_events: true,
  new_followers: true,
  likes_on_comments: true,
  profile_updates: true,
  password_changes: true,
  security_alerts: true,
  event_promotions: true,
  newsletters: true,
  direct_messages: true,
  system_announcements: true,
  email_notifications: true,
};

export function NotificationForm() {
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });

  function onSubmit(data: NotificationsFormValues) {
    toast({
      title: "다음 값이 제출되었습니다:",
      description: (
        <pre className="mt-2 w-full rounded-md bg-gray-800 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8">
        {/* 전체 알림 설정 */}
        <FormField
          control={form.control}
          name="all_notifications"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-medium">모든 알림 받기</FormLabel>
            </FormItem>
          )}
        />
        {NOTIFICATION_SECTION_LIST.map((section) => (
          <NotificationSection
            title={NOTIFICATION_SECTION[section].title}
            key={section}
          >
            {NOTIFICATION_SECTION[section].switches.map((switchItem) => (
              <NotificationSwitch
                key={switchItem.name} // switch 요소에 key 추가
                control={form.control}
                name={switchItem.name}
                label={switchItem.label}
                description={switchItem.description}
              />
            ))}
          </NotificationSection>
        ))}
        {/* 이메일 알림 설정 */}
        <FormField
          control={form.control}
          name="email_notifications"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-medium">이메일로 알림 받기</FormLabel>
            </FormItem>
          )}
        />

        {/* 제출 버튼 */}
        <Button type="submit">알림 업데이트</Button>
      </form>
    </Form>
  );
}
