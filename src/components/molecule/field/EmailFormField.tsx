import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { Mail } from 'lucide-react';

interface EmailFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  label?: boolean;
  placeholder?: boolean;
  icon?: boolean;
}

const ICON_STYLE = 'size-5 text-muted-foreground absolute top-1/2 -translate-y-1/2';

export default function EmailFormField<T extends FieldValues>({
  form,
  label = false,
  icon = true,
  placeholder = true,
}: EmailFormFieldProps<T>) {
  return (
    <>
      <FormField
        control={form.control}
        name={'email' as Path<T>}
        render={({ field }) => (
          <FormItem className={`${label && 'h-[72px]'} relative w-full`}>
            {label && <FormLabel>이메일</FormLabel>}
            <div className="relative">
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={placeholder ? '이메일을 입력해 주세요.' : ''}
                  className={`${icon && 'pl-10'}`}
                />
              </FormControl>
              {icon && <Mail className={`${ICON_STYLE} left-3`} />}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
