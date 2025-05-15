import React from 'react';

import Input from '@/components/forms/Input';

import { DateInput } from '@/app/peminjaman/form/component/DateInput';

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function DateSelector({
  selectedDate,
  onDateChange,
}: DateSelectorProps) {
  return (
    <div className='tanggal-field flex flex-col'>
      <label>Pilih tanggal</label>
      <div className='border-gray-100 w-full h-[55px] flex flex-row'>
        <div className='date-picker w-[100px]'>
          <DateInput selected={selectedDate} onDateSelect={onDateChange} />
        </div>
        <div className='date-field w-full'>
          <Input id='dateField' readOnly />
        </div>
      </div>
    </div>
  );
}
