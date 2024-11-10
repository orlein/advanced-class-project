import {
  NotificationsFormValues,
  defaultNotificationValues,
  notificationsFormSchema,
} from '@/lib/schemas/notificationSchema';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { useToast } from './use-toast';

const useNotificationFrom = () => {
  const { toast } = useToast();
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: defaultNotificationValues,
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

  return { form, onSubmit };
};

export default useNotificationFrom;
