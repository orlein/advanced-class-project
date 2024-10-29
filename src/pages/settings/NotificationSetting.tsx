import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';

const notificationsFormSchema = z.object({
    type: z.enum(['all', 'mentions', 'none'], {
        required_error: '알림 유형을 선택해주세요.',
    }),
    mobile: z.boolean().default(false).optional(),
    communication_emails: z.boolean().default(false).optional(),
    social_emails: z.boolean().default(false).optional(),
    marketing_emails: z.boolean().default(false).optional(),
    security_emails: z.boolean(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

// 초기 값 설정
const defaultValues: Partial<NotificationsFormValues> = {
    communication_emails: false,
    marketing_emails: false,
    social_emails: true,
    security_emails: true,
};

export default function NotificationSetting() {
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
                {/* 알림 유형 선택 */}
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>알림 받기</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="all" />
                                        </FormControl>
                                        <FormLabel className="font-normal">모든 새 메시지</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="mentions" />
                                        </FormControl>
                                        <FormLabel className="font-normal">직접 메시지 및 멘션</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="none" />
                                        </FormControl>
                                        <FormLabel className="font-normal">알림 없음</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* 이메일 알림 설정 */}
                <div>
                    <h3 className="mb-4 text-lg font-medium">이메일 알림</h3>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="communication_emails"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">커뮤니케이션 이메일</FormLabel>
                                        <FormDescription>
                                            계정 활동에 대한 이메일을 받습니다.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="marketing_emails"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">마케팅 이메일</FormLabel>
                                        <FormDescription>
                                            신제품, 기능 등에 대한 이메일을 받습니다.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="social_emails"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">소셜 이메일</FormLabel>
                                        <FormDescription>
                                            친구 요청, 팔로우 등에 대한 이메일을 받습니다.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="security_emails"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">보안 이메일</FormLabel>
                                        <FormDescription>
                                            계정 활동 및 보안에 대한 이메일을 받습니다.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            disabled
                                            aria-readonly
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* 모바일 설정 */}
                <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>모바일 기기에 다른 설정 사용</FormLabel>
                                <FormDescription>
                                    모바일 알림은{' '}
                                    <a href="/settings/mobile" className="text-blue-500 underline">
                                        모바일 설정
                                    </a>{' '}
                                    페이지에서 관리할 수 있습니다.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                {/* 제출 버튼 */}
                <Button type="submit">알림 업데이트</Button>
            </form>
        </Form>
    );
}
