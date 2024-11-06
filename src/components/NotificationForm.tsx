"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

import {
  notificationsFormSchema,
  NotificationsFormValues,
  defaultNotificationValues,
} from "@/lib/schemas/notificationSchema";

export function NotificationForm() {
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: defaultNotificationValues,
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
