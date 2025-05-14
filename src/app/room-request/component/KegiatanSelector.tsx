import React from 'react';

import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';

interface KegiatanSelectorProps {
  options: Array<{ value: string; label: string }>;
}

const KegiatanSelector = ({ options }: KegiatanSelectorProps) => {
  return (
    <div>
      <Select id='jenisSelect' label='Pilih jenis kegiatan' options={options} />
      <Input id='deskripsiInput' label='Deskripsi Kegiatan' />
    </div>
  );
};

export default KegiatanSelector;
