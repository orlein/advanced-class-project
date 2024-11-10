import { FormField, FormItem, FormLabel, FormDescription, FormControl } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { NotificationsFormValues } from '@/lib/schemas/notificationSchema';
import { Control } from 'react-hook-form';

interface NotificationSwitchProps {
  control: Control<NotificationsFormValues>;
  name: keyof NotificationsFormValues;
  label: string;
  description: string;
  disabled?: boolean;
}

export function NotificationSwitch({
  control,
  name,
  label,
  description,
  disabled = false,
}: NotificationSwitchProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
