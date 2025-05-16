'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { imageUrl } from '@/lib/api';

import Button from '@/components/buttons/Button';
import { Card } from '@/components/Card';
import CreatableSelectInput from '@/components/forms/CreatableSelect';
import DropzoneInput from '@/components/forms/DropzoneInput';
import Input from '@/components/forms/Input';
import Textarea from '@/components/forms/Textarea';
import withAuth from '@/components/hoc/withAuth';
import AdminLayout from '@/components/layouts/admin/AdminLayout';

import useEditRuanganMutation from '@/app/admin/ruangan/edit/[id]/hooks/useEditRuanganMutation';
import { useGetAllRuangan } from '@/app/ruangan/hooks/useGetRuanganOptions';

import { FileWithPreview } from '@/types/dropzone';

export type EditRuanganRequest = {
  namaRuangan: string;
  kapasitas: number;
  fasilitas: string | { label: string; value: string }[];
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

export default withAuth(EditRuanganForm, 'admin');
function EditRuanganForm() {
  const { id } = useParams();
  const { listRuanganData } = useGetAllRuangan();
  const selectedRuangan = listRuanganData?.data.find(
    (ruangan) => ruangan.idRuangan === Number(id)
  );

  const methods = useForm<EditRuanganRequest>({
    mode: 'onTouched',
  });

  React.useEffect(() => {
    if (selectedRuangan) {
      methods.reset({
        namaRuangan: selectedRuangan.namaRuangan || '',
        kapasitas: selectedRuangan.kapasitas || 0,
        fasilitas:
          selectedRuangan.fasilitas?.split(',').map((item) => {
            const trimmed = item.trim();
            return { label: trimmed, value: trimmed };
          }) || [],
        Gedung: selectedRuangan.Gedung || '',
        deskripsi: selectedRuangan.deskripsi || '',
        gambar: selectedRuangan.gambar
          ? [
              {
                preview: imageUrl(selectedRuangan.gambar),
                name: selectedRuangan.gambar,
                size: 0,
                lastModified: Date.now(),
                webkitRelativePath: '',
                type: 'image/jpeg',
              } as FileWithPreview,
            ]
          : [],
      });
    }
  }, [selectedRuangan, methods]);

  const { handleSubmit } = methods;
  const { editRuanganMutation, isPending } = useEditRuanganMutation({
    idRuangan: Number(id),
  });

  function onSubmit(data: EditRuanganRequest) {
    editRuanganMutation({
      ...data,
      fasilitas: Array.isArray(data.fasilitas)
        ? data.fasilitas
            .map((item) => (typeof item === 'string' ? item : item.value))
            .join(', ')
        : data.fasilitas,
    });
  }

  return (
    <AdminLayout
      title='Edit Ruangan'
      subheading='Silahkan isi form berikut untuk mengedit ruangan'
      breadcrumbs={['/admin', '/admin/ruangan', '/admin/ruangan/edit/[id]']}
      backHref={`/admin/ruangan/${id}`}
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
              helperText='Pilih fasilitas yang tersedia di ruangan ini, atau buat fasilitas baru.'
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
