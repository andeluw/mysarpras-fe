import React from 'react';

import Select from '@/components/forms/Select';

interface TimeSelectorProps {
  options: Array<{ value: string; label: string }>;
  disabled?: boolean;
}

export default function TimeSelector({ options, disabled }: TimeSelectorProps) {
  return (
    <div className='jam-field flex flex-row w-full gap-4'>
      <div className='jam-awal w-full'>
        <Select
          id='jamAwalSelect'
          label='Pilih Jam Awal'
          options={options}
          disabled={disabled}
        />
      </div>
      <div className='jam-akhir w-full'>
        <Select
          id='jamAkhirSelect'
          label='Pilih Jam Akhir'
          options={options}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
