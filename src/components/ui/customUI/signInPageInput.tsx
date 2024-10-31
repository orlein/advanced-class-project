import { Input } from '@/components/ui/input';
import { LucideProps } from 'lucide-react';
import { forwardRef } from 'react';

interface InputProps {
  icon: React.ComponentType<LucideProps>;
  type: string;
  name: string;
  placeholder: string;
}

export const SignInPageInput = forwardRef<HTMLInputElement, InputProps>(
  ({ icon: Icon, type, name, placeholder }, ref) => {
    const INPUT_STYLE = 'px-9 grow outline-none bg-transparent text-sm';
    const INPUT_BOX = `flex w-full items-center gap-2`;
    const ICON_STYLE =
      'size-5 text-muted-foreground absolute top-1/2 -translate-y-1/2 left-4';

    return (
      <div className={INPUT_BOX}>
        <div className='relative'>
          <Icon className={ICON_STYLE} />
        </div>
        <Input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          className={INPUT_STYLE}
          autoComplete='off'
          required
          onInvalid={(e) => e.preventDefault()}
        />
      </div>
    );
  }
);
