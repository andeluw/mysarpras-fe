import React from 'react';

import { cn } from '@/lib/utils';

interface ChipProps {
  label: string;
  className?: string;
}

const FasilitasChip = ({ label, className }: ChipProps) => {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1.5 rounded-full text-sm bg-primary-50 text-primary-800 font-medium',
        className
      )}
    >
      {label}
    </span>
  );
};

export default FasilitasChip;
