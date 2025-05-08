import { cva, VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { ImSpinner2 } from 'react-icons/im';

import { cn } from '@/lib/utils';

type ButtonVariant = VariantProps<typeof buttonClassName>['variant'];
type ButtonSize = VariantProps<typeof buttonClassName>['size'];

const buttonSizes = ['sm', 'base', 'md', 'lg', 'icon'] as ButtonSize[];
const buttonVariants = [
  'primary',
  'secondary',
  'outline',
  'ghost',
  'light',
  'dark',
  'destructive',
  'outlineblack',
] as ButtonVariant[];

const buttonClassName = cva(
  'inline-flex items-center justify-center rounded-md font-semibold transition-colors duration-75 shadow-sm disabled:cursor-not-allowed focus:outline-none focus-visible:ring [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-800 text-white border border-primary-700 hover:bg-primary-900 hover:text-white active:bg-primary-950 disabled:bg-primary-900 focus-visible:ring-primary-800',
        secondary:
          'bg-primary-500 text-white border border-primary-600 hover:bg-primary-600 hover:text-white active:bg-primary-700 disabled:bg-primary-700 focus-visible:ring-primary-500',
        outline:
          'text-primary-500 border border-primary-500 hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100 focus-visible:ring-primary-500',
        ghost:
          'text-primary-500 shadow-none hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
        light:
          'bg-white text-gray-700 border border-gray-300 hover:text-dark hover:bg-gray-100 active:bg-white/80 disabled:bg-gray-200 focus-visible:ring-gray-300',
        dark: 'bg-primary text-primary-foreground shadow hover:bg-primary/90 text-sm  disabled:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 disabled:bg-destructive/90 focus-visible:ring-destructive',
        outlineblack:
          'text-black border-2 border-black hover:bg-gray-50 active:bg-gray-100 disabled:bg-gray-100 focus-visible:ring-gray-300',
      },
      size: {
        base: 'px-3 py-1.5 text-sm md:text-base',
        sm: 'px-2 py-1 text-xs md:text-sm',
        md: 'h-10 px-4 py-2 text-sm md:text-base',
        lg: 'h-12 rounded-md px-6 text-lg md:text-xl',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'base',
    },
  }
);

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  classNames?: {
    leftIcon?: string;
    rightIcon?: string;
    content?: string;
  };
  iconSize?: string | number;
  isIconFilled?: boolean;
  filledIcon?: string;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      size = 'base',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      classNames,
      iconSize = '1em',
      isIconFilled = false,
      filledIcon = 'white',
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={cn(
          buttonClassName({ variant, size }),
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': [
                  'primary',
                  'secondary',
                  'dark',
                  'destructive',
                ].includes(variant as string),
                'text-black': ['light', 'outlineblack'].includes(
                  variant as string
                ),
                'text-primary-500': ['outline', 'ghost'].includes(
                  variant as string
                ),
              }
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {LeftIcon && (
          <div
            className={cn([
              size === 'base' && 'mr-1',
              size === 'sm' && 'mr-1.5',
              size === 'icon' && 'mr-0',
              size === 'lg' && 'mr-2',
              size === 'md' && 'mr-2',
            ])}
          >
            <LeftIcon
              size={iconSize}
              className={cn(
                [
                  size === 'base' && 'md:text-base text-base',
                  size === 'sm' && 'md:text-base text-sm',
                  size === 'icon' && 'text-base',
                  size === 'lg' && 'text-lg',
                  size === 'md' && 'text-base',
                ],
                classNames?.leftIcon
              )}
              fill={isIconFilled ? filledIcon : 'none'}
              strokeWidth={isIconFilled ? 3 : 2.75}
            />
          </div>
        )}
        <span
          className={cn(
            'inline-flex items-center gap-1 whitespace-nowrap',
            classNames?.content
          )}
        >
          {children}
        </span>
        {RightIcon && (
          <div
            className={cn([
              size === 'base' && 'ml-1',
              size === 'sm' && 'ml-1.5',
              size === 'icon' && 'ml-0',
              size === 'lg' && 'ml-2',
              size === 'md' && 'ml-2',
            ])}
          >
            <RightIcon
              size={iconSize}
              className={cn(
                [
                  size === 'base' && 'md:text-base text-base',
                  size === 'sm' && 'md:text-base text-sm',
                  size === 'icon' && 'text-base',
                  size === 'lg' && 'text-lg',
                  size === 'md' && 'text-base',
                ],
                classNames?.rightIcon
              )}
              fill={isIconFilled ? filledIcon : 'none'}
              strokeWidth={isIconFilled ? 3 : 2.75}
            />
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
export { type ButtonProps, buttonClassName };
export type { ButtonSize, ButtonVariant };
export { buttonSizes, buttonVariants };
