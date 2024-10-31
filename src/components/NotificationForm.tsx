"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

import { NotificationSection } from './NotificationSection';
import { NotificationSwitch } from './NotificationSwitch';

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
            title: '다음 값이 제출되었습니다:',
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
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="font-medium">
                                모든 알림 받기
                            </FormLabel>
                        </FormItem>
                    )}
                />

                {/* 포스트 알림 섹션 */}
                <NotificationSection title="포스트 알림">
                    <NotificationSwitch
                        control={form.control}
                        name="new_comments"
                        label="새 댓글"
                        description="내 포스트에 새 댓글이 달리면 알림을 받습니다."
                    />
                    <NotificationSwitch
                        control={form.control}
                        name="replies_to_comments"
                        label="댓글에 대한 답글"
                        description="내 댓글에 답글이 달리면 알림을 받습니다."
                    />
                    <NotificationSwitch
                        control={form.control}
                        name="post_recommendations"
                        label="포스트 추천"
                        description="누군가 내 포스트를 추천하면 알림을 받습니다."
                    />
                    <NotificationSwitch
                        control={form.control}
                        name="mentions"
                        label="멘션"
                        description="포스트나 댓글에서 멘션되면 알림을 받습니다."
                    />
                </NotificationSection>

                {/* 챌린지 알림 섹션 */}
                <NotificationSection title="챌린지 알림">
                    <NotificationSwitch
                        control={form.control}
                        name="new_challenges"
                        label="새로운 챌린지"
                        description="새로운 챌린지가 시작되면 알림을 받습니다."
                    />
                    <NotificationSwitch
                        control={form.control}
                        name="challenge_updates"
                        label="챌린지 업데이트"
                        description="참여 중인 챌린지의 업데이트를 받습니다."
                    />
                    <NotificationSwitch
                        control={form.control}
                        name="challenge_completion"
                        label="챌린지 완료"
                        description="챌린지를 완료하거나 마일스톤을 달성하면 알림을 받습니다."
                    />
                    <NotificationSwitch
                        control={form.control}
                        name="challenge_events"
                        label="챌린지 이벤트"
                        description="챌린지 이벤트의 시작 및 종료 알림을 받습니다."
                    />
                </NotificationSection>

                {/* 소셜 알림 섹션 */}
                <NotificationSection title="소셜 알림">
                    <NotificationSwitch
                        control={form.control}
                        name="new_followers"
                        label="새로운 팔로워"
                        description="누군가 나를 팔로우하면 알림을 받습니다."
                    />
                    <NotificationSwitch
                        control={form.control}
                        name="likes_on_comments"
                        label="댓글 추천"
                        description="누군가 내 댓글을 추천하면 알림을 받습니다."
                    />
                </NotificationSection>

                {/* 계정 및 보안 섹션 */}
                <NotificationSection title="계정 및 보안">
                    <NotificationSwitch
                        control={form.control}
                        name="profile_updates"
                        label="프로필 업데이트"
                        description="프로필 변경 시 알림을 받습니다."
                        disabled
                    />
                    <NotificationSwitch
                        control={form.control}
                        name="password_changes"
                        label="비밀번호 변경"
                        description="비밀번호 변경 시 알림을 받습니다."
                        disabled
                    />
                    <NotificationSwitch
                        control={form.control}
                        name="security_alerts"
                        label="보안 알림"
                        description="계정 보안 관련 중요한 알림을 받습니다."
                        disabled
                    />
                </NotificationSection>

                {/* 프로모션 및 업데이트 섹션 */}
                <NotificationSection title="프로모션 및 업데이트">
                    <NotificationSwitch
                        control={form.control}
                        name="event_promotions"
                        label="이벤트 프로모션"
                        description="다가오는 이벤트 및 프로모션에 대한 알림을 받습니다."
                    />
                    <NotificationSwitch
                        control={form.control}
                        name="newsletters"
                        label="뉴스레터"
                        description="최신 소식 및 업데이트를 위한 뉴스레터를 받습니다."
                    />
                </NotificationSection>

                {/* 기타 알림 섹션 */}
                <NotificationSection title="기타 알림">
                    <NotificationSwitch
                        control={form.control}
                        name="direct_messages"
                        label="다이렉트 메시지"
                        description="다른 사용자로부터 다이렉트 메시지를 받으면 알림을 받습니다."
                    />
                    <NotificationSwitch
                        control={form.control}
                        name="system_announcements"
                        label="시스템 공지사항"
                        description="중요한 시스템 업데이트나 유지보수에 대한 알림을 받습니다."
                        disabled
                    />
                </NotificationSection>

                {/* 이메일 알림 설정 */}
                <FormField
                    control={form.control}
                    name="email_notifications"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-3">
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="font-medium">
                                이메일로 알림 받기
                            </FormLabel>
                        </FormItem>
                    )}
                />

                {/* 제출 버튼 */}
                <Button type="submit">알림 업데이트</Button>
            </form>
        </Form>
    );
}
