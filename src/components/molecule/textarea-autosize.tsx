import React from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import { cn } from '@/lib/utils';

export const TextareaAutoSize = React.forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextareaAutosize
        ref={ref}
        className={cn(
          'flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    );
  },
);
TextareaAutoSize.displayName = 'TextareaAutoSize';
