import { Eye, EyeOff, Lock } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

const ICON_STYLE =
  'size-5 text-muted-foreground absolute top-1/2 -translate-y-1/2';

interface PasswordFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name?: Path<T>;
  label?: string;
  placeholder?: boolean;
  icon?: boolean;
}

export default function PasswordFormField<T extends FieldValues>({
  form,
  name = 'password' as Path<T>,
  label,
  placeholder,
  icon,
}: PasswordFormFieldProps<T>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={`${label && 'h-20'} w-full`}>
            {label && <FormLabel>{label}</FormLabel>}
            <div className='relative'>
              <FormControl>
                <Input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder={placeholder ? '비밀번호를 입력해 주세요.' : ''}
                  className={`${icon ? 'px-10' : 'pr-10'}`}
                />
              </FormControl>
              {icon && <Lock className={`${ICON_STYLE} left-3`} />}
              {!showPassword ? (
                <Eye
                  className={`${ICON_STYLE} right-3 cursor-pointer`}
                  onClick={handleShowPassword}
                />
              ) : (
                <EyeOff
                  className={`${ICON_STYLE} right-3 cursor-pointer`}
                  onClick={handleShowPassword}
                />
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />{' '}
    </>
  );
}
