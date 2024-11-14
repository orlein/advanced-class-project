import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { Mail } from 'lucide-react';
import { Button } from '../../ui/button';

interface EmailFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  label?: boolean;
  placeholder?: boolean;
  icon?: boolean;
  button?: boolean;
}

export default function EmailFormField<T extends FieldValues>({
  form,
  label = false,
  icon = true,
  placeholder = true,
  button = false,
}: EmailFormFieldProps<T>) {
  return (
    <>
      <FormField
        control={form.control}
        name={'email' as Path<T>}
        render={({ field }) => (
          <FormItem>
            <section className="relative flex items-end gap-3">
              {icon && (
                <Mail className="size-5 absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground" />
              )}
              <div className="w-full flex-grow">
                {label && <FormLabel>이메일</FormLabel>}
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder={placeholder ? '이메일을 입력해 주세요.' : ''}
                    className={`${icon && 'pl-10'}`}
                  />
                </FormControl>
              </div>
              {button && <Button type="button">이메일 인증</Button>}
            </section>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
