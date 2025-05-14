import React from 'react';

import Select from '@/components/forms/Select';

interface RoomSelectorProps {
  options: Array<{ value: string; label: string }>;
  selectedDate: Date;
}

export default function RoomSelector({
  options,
  selectedDate,
}: RoomSelectorProps) {
  return (
    <Select
      id='ruanganSelect'
      label='Pilih ruangan'
      options={options}
      placeholder={
        selectedDate ? 'Pilih ruangan' : 'Pilih tanggal terlebih dahulu'
      }
      isMulti
      isDisabled={!selectedDate}
    />
  );
}
