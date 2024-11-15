import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';

interface UsernameFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
}

export default function UsernameFormField<T extends FieldValues>({
  form,
}: UsernameFormFieldProps<T>) {
  return (
    <>
      <FormField
        control={form.control}
        name={'username' as Path<T>}
        render={({ field }) => (
          <FormItem className="h-[72px] w-full">
            <FormLabel>닉네임</FormLabel>
            <div className="relative">
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
