import { UseFormReturn } from 'react-hook-form';
import { NotificationSwitch } from '../molecule/NotificationSwitch';
import { NOTIFICATION_SECTION } from '@/constants/notification';
import { NotificationSectionKey } from '@/types/notification';
import { NotificationsFormValues } from '@/lib/schemas/notificationSchema';

interface NotificationSectionProps {
  title: string;
  form: UseFormReturn<NotificationsFormValues>;
  section: NotificationSectionKey;
}

export function NotificationSection({ title, form, section }: NotificationSectionProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">{title}</h3>
      <div className="space-y-4">
        {NOTIFICATION_SECTION[section].switches.map(switchItem => (
          <NotificationSwitch
            key={switchItem.name} // switch 요소에 key 추가
            control={form.control}
            name={switchItem.name}
            label={switchItem.label}
            description={switchItem.description}
          />
        ))}
      </div>
    </div>
  );
}
