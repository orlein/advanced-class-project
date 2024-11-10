import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Checkbox } from '../../ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '../../ui/form';

interface CheckBoxFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  label: string;
}

export default function CheckBoxFormField<T extends FieldValues>({
  form,
  label,
}: CheckBoxFormFieldProps<T>) {
  return (
    <>
      <FormField
        control={form.control}
        name={'isEmailToBeSaved' as Path<T>}
        render={({ field }) => (
          <FormItem className="flex gap-1">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="size-4 relative top-[7px] border-muted-foreground"
              />
            </FormControl>
            <FormLabel className="h-4 pl-px">{label}</FormLabel>
          </FormItem>
        )}
      />
    </>
  );
}
