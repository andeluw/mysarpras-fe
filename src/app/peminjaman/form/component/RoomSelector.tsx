import React from 'react';

import HelperText from '@/components/forms/HelperText';
import Select from '@/components/forms/Select';
import PrimaryLink from '@/components/links/PrimaryLink';

interface RoomSelectorProps {
  options: Array<{ value: string; label: string }>;
  isLoading?: boolean;
}

export default function RoomSelector({
  options,
  isLoading,
}: RoomSelectorProps) {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Select
        id='ruanganId'
        label='Ruangan'
        options={options}
        placeholder='Pilih Ruangan'
        isLoading={isLoading}
        validation={{
          required: {
            value: true,
            message: 'Ruangan tidak boleh kosong',
          },
        }}
      />
      <HelperText>
        Detail ruangan dapat dilihat lebih lengkap{' '}
        <PrimaryLink href='/ruangan'>di sini</PrimaryLink>.
      </HelperText>
    </div>
  );
}
