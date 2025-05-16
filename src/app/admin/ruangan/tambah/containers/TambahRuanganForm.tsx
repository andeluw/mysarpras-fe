'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import { Card } from '@/components/Card';
import CreatableSelectInput from '@/components/forms/CreatableSelect';
import DropzoneInput from '@/components/forms/DropzoneInput';
import Input from '@/components/forms/Input';
import Textarea from '@/components/forms/Textarea';
import withAuth from '@/components/hoc/withAuth';
import AdminLayout from '@/components/layouts/admin/AdminLayout';

import useTambahRuanganMutation from '@/app/admin/ruangan/tambah/hooks/useTambahRuanganMutation';

import { FileWithPreview } from '@/types/dropzone';

export type TambahRuanganRequest = {
  namaRuangan: string;
  kapasitas: number;
  fasilitas: string;
  Gedung: string;
  deskripsi: string;
  gambar: FileWithPreview[];
};

const facilityOptions = [
  { label: 'AC', value: 'AC' },
  { label: 'Proyektor', value: 'Proyektor' },
  { label: 'Sound system', value: 'Sound system' },
  { label: 'Meja', value: 'Meja' },
  { label: 'Kursi', value: 'Kursi' },
  { label: 'TV Wall', value: 'TV Wall' },
  { label: 'Sound system + Mic', value: 'Sound system + Mic' },
];

export default withAuth(TambahRuanganForm, 'admin');
function TambahRuanganForm() {
  const methods = useForm<TambahRuanganRequest>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;

  const { tambahRuanganMutation, isPending } = useTambahRuanganMutation();

  function onSubmit(data: TambahRuanganRequest) {
    tambahRuanganMutation(data);
  }

  return (
    <AdminLayout
      title='Tambah Ruangan'
      subheading='Silahkan isi form berikut untuk menambah ruangan'
      breadcrumbs={['/admin', '/admin/ruangan', '/admin/ruangan/tambah']}
    >
      <Card>
        <FormProvider {...methods}>
          <form
            className='flex gap-y-6 flex-col p-8 gap-6'
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type='text'
              label='Nama Ruangan'
              id='namaRuangan'
              validation={{
                required: 'Nama ruangan tidak boleh kosong',
              }}
              placeholder='Masukkan nama ruangan'
            />

            <Input
              type='number'
              label='Kapasitas'
              id='kapasitas'
              validation={{
                required: 'Kapasitas tidak boleh kosong',
                min: {
                  value: 1,
                  message: 'Kapasitas tidak boleh kurang dari 1',
                },
              }}
              placeholder='Masukkan kapasitas'
            />

            <Input
              type='text'
              label='Nama Gedung'
              id='Gedung'
              validation={{
                required: 'Nama gedung tidak boleh kosong',
              }}
              placeholder='Masukkan nama gedung'
            />

            <CreatableSelectInput
              id='fasilitas'
              label='Fasilitas'
              isMulti
              isClearable
              placeholder='Pilih fasilitas'
              validation={{
                required: 'Fasilitas tidak boleh kosong',
              }}
              helperText='Pilih fasilitas yang tersedia di ruangan ini, atau buat fasilitas baru. Untuk membuat fasilitas baru, ketikkan nama fasilitas dan tekan enter.'
              options={facilityOptions}
            />

            <Textarea
              id='deskripsi'
              label='Deskripsi'
              validation={{
                required: {
                  value: true,
                  message: 'Deskripsi tidak boleh kosong',
                },
              }}
              rows={4}
              placeholder='Masukkan deskripsi'
            />

            <DropzoneInput
              id='gambar'
              label='Gambar'
              validation={{
                required: 'Gambar tidak boleh kosong',
              }}
              helperText='Format gambar yang didukung: JPG, JPEG, PNG'
              accept={{
                'image/*': ['.png', '.jpg', '.jpeg'],
              }}
              maxFiles={1}
              maxSize={5000000} // 5MB
            />
            <Button type='submit' isLoading={isPending}>
              Submit
            </Button>
          </form>
        </FormProvider>
      </Card>
    </AdminLayout>
  );
}
