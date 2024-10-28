import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
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
    const isMobile = useIsMobile();
    const INPUT_STYLE = 'p-2 grow outline-none bg-transparent text-sm';
    const INPUT_BOX = `flex ${
      isMobile ? 'w-full' : 'w-[500px]'
    } items-center px-2 gap-2`;
    const ICON_STYLE = 'size-5 text-secondary-foreground';

    return (
      <div className={INPUT_BOX}>
        <Icon className={ICON_STYLE} />
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
