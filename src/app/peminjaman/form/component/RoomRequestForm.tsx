'use client';

import { addDays, format } from 'date-fns';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import { Card } from '@/components/Card';
import { DatePicker } from '@/components/DatePicker';
import HelperText from '@/components/forms/HelperText';
import Select from '@/components/forms/Select';
import Textarea from '@/components/forms/Textarea';
import PrimaryLink from '@/components/links/PrimaryLink';
import Typography from '@/components/Typography';

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

const user = {
  namaUser: 'Budi Santoso',
  email: 'dosen@example.com',
  noTelp: null,
  role: 'dosen',
  kartuTandaPengenal: `${process.env.NEXT_PUBLIC_API_URL}/uploads/user/ff41271d-1d79-4b02-a230-6ae5f3183b4c.png`,
};

export default function RoomRequestForm() {
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
    <section className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <Typography variant='j2' className='text-primary-800'>
          Buat Peminjaman
        </Typography>
        <Typography variant='s2' className='text-muted-foreground'>
          Silahkan isi form berikut untuk membuat peminjaman ruangan.
        </Typography>
      </div>
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
              fromDate={
                user.role == 'mahasiswa' ? addDays(new Date(), 3) : new Date()
              }
              toDate={
                user.role == 'mahasiswa' ? addDays(new Date(), 14) : undefined
              }
              helperText='Mahasiswa dapat mengajukan peminjaman maksimal 3 hari sebelum tanggal penggunaan, dan paling lambat 14 hari ke depan.'
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
    </section>
  );
}
