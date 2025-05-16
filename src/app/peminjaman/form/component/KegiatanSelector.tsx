import React from 'react';

import Select from '@/components/forms/Select';
import Textarea from '@/components/forms/Textarea';

interface KegiatanSelectorProps {
  options: Array<{ value: string; label: string }>;
}

const KegiatanSelector = ({ options }: KegiatanSelectorProps) => {
  return (
    <div className='flex flex-col gap-8 w-full'>
      <Select id='jenisSelect' label='Pilih jenis kegiatan' options={options} />
      <Textarea id='deskripsiInput' label='Deskripsi Kegiatan' />
    </div>
  );
};

export default KegiatanSelector;
