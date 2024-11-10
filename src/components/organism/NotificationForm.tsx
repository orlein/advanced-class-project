'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

import { NotificationSection } from './NotificationSection';
import { NOTIFICATION_SECTION, NOTIFICATION_SECTION_LIST } from '@/constants/notification';
import useNotificationFrom from '@/hooks/useNotificationFrom';

export function NotificationForm() {
  const { form, onSubmit } = useNotificationFrom();

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
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="font-medium">모든 알림 받기</FormLabel>
            </FormItem>
          )}
        />
        {NOTIFICATION_SECTION_LIST.map(section => (
          <NotificationSection
            title={NOTIFICATION_SECTION[section].title}
            section={section}
            form={form}
            key={section}
          />
        ))}
        {/* 이메일 알림 설정 */}
        <FormField
          control={form.control}
          name="email_notifications"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3">
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
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
