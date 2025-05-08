import { cn } from '@/lib/utils';

import Typography from '@/components/Typography';

export default function ErrorMessage({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className='flex space-x-1'>
      <Typography
        as='p'
        variant='s4'
        color='danger'
        className={(cn('text-xs !leading-tight'), className)}
      >
        {children}
      </Typography>
    </div>
  );
}
