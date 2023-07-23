import * as React from 'react';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full h-[38px] rounded-md border border-zinc-200 bg-white px-2.5 py-1 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-500 dark:focus-visible:ring-zinc-800 dark:text-zinc-300 text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };

type InputWithLabelProps = InputProps & {
  id: string;
  label: React.ReactNode;
  required?: boolean;
};
export const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  required,
  ...props
}) => {
  return (
    <div className="grid items-center w-full max-w-sm gap-1">
      <Label className="mt-2 font-medium text-zinc-400" htmlFor={props.id}>
        {label}
        {required && <span className="text-red-400"> *</span>}
      </Label>
      <Input {...props} />
    </div>
  );
};
