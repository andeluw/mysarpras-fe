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
        'inline-block px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 mr-2 mb-2',
        className
      )}
    >
      {label}
    </span>
  );
};

export default FasilitasChip;
