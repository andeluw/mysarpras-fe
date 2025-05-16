'use client';

import { format } from 'date-fns';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import { Card } from '@/components/Card';
import { DatePicker } from '@/components/DatePicker';
import HelperText from '@/components/forms/HelperText';
import Select from '@/components/forms/Select';
import Textarea from '@/components/forms/Textarea';
import withAuth from '@/components/hoc/withAuth';
import AdminLayout from '@/components/layouts/admin/AdminLayout';
import PrimaryLink from '@/components/links/PrimaryLink';

import RoomSelector from '@/app/peminjaman/form/component/RoomSelector';
import TimeSelector from '@/app/peminjaman/form/component/TimeSelector';
import usePinjamMutation from '@/app/peminjaman/form/hooks/usePinjamMutation';
import useGetRuanganOptions from '@/app/ruangan/hooks/useGetRuanganOptions';
import { jenisKegiatanOptions } from '@/constant/selectoption';

export type RoomRequestFormData = {
  ruanganId: number | string;
  tanggal: Date | string;
  jamAwal: string;
  jamAkhir: string;
  jenisKegiatan: string;
  deskripsi: string;
};

export default withAuth(FormPeminjamanPage, 'admin');
function FormPeminjamanPage() {
  const methods = useForm<RoomRequestFormData>({
    mode: 'onTouched',
  });
  const { watch, handleSubmit } = methods;
  const selectedIdRuangan = watch('ruanganId');
  const selectedDate = watch('tanggal');
  const selectedJamAwal = watch('jamAwal');

  const { listRuanganOptions, isLoadingRuangan } = useGetRuanganOptions();

  const { pinjamMutation, isPending } = usePinjamMutation();

  function onSubmit(data: RoomRequestFormData) {
    pinjamMutation({
      ...data,
      ruanganId: Number(data.ruanganId),
      tanggal: format(data.tanggal, 'yyyy-MM-dd'),
    });
  }

  return (
    <AdminLayout
      title='Buat Peminjaman'
      subheading='Silahkan isi form berikut untuk membuat peminjaman'
      breadcrumbs={['/admin', '/admin/peminjaman/form']}
    >
      <Card>
        <FormProvider {...methods}>
          <form
            className='flex gap-y-8 flex-col p-8 gap-6'
            onSubmit={handleSubmit(onSubmit)}
          >
            <RoomSelector
              options={listRuanganOptions}
              isLoading={isLoadingRuangan}
            />

            <DatePicker
              name='tanggal'
              label='Tanggal Peminjaman'
              placeholder='Pilih Tanggal'
              validation={{
                required: 'Tanggal peminjaman tidak boleh kosong',
              }}
              fromDate={new Date()}
              toDate={undefined}
            />

            <div>
              <TimeSelector
                selectedIdRuangan={selectedIdRuangan as number}
                selectedDate={selectedDate as Date}
                selectedJamAwal={selectedJamAwal}
              />
              <HelperText helperTextClassName='mt-2'>
                Jadwal ketersediaan ruangan dapat dilihat lebih lengkap{' '}
                <PrimaryLink href='/ruangan/jadwal-ketersediaan'>
                  di sini
                </PrimaryLink>
                .
              </HelperText>
            </div>

            <Select
              id='jenisKegiatan'
              label='Jenis Kegiatan'
              options={jenisKegiatanOptions}
              validation={{
                required: {
                  value: true,
                  message: 'Jenis kegiatan tidak boleh kosong',
                },
              }}
              placeholder='Pilih Jenis Kegiatan'
            />

            <Textarea
              id='deskripsi'
              label='Alasan Peminjaman'
              validation={{
                required: {
                  value: true,
                  message: 'Alasan peminjaman tidak boleh kosong',
                },
              }}
              rows={4}
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
