import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form';
import { Input } from '../input';
import { Control } from 'react-hook-form';
import { userInfoType } from '@/pages/account/SignUp';

interface SignUpFormFieldProps {
  form: {
    control: Control<userInfoType>;
  };
  type?: 'text' | 'password' | 'email';
  name: 'username' | 'email' | 'password' | 'confirmedPassword';
  label: string;
}

export default function SignUpFormField({
  form,
  type = 'text',
  name,
  label,
}: SignUpFormFieldProps) {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input {...field} type={type} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
