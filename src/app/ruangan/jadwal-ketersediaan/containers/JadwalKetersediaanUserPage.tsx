'use client';

import { useQuery } from '@tanstack/react-query';
import { User } from 'lucide-react';
import React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import api from '@/lib/api';
import { formatDateToLocalYYYYMMDD, formatDateUTC } from '@/lib/date';
import { cn } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/Card';
import { DatePicker } from '@/components/DatePicker';
import Select from '@/components/forms/Select';
import withAuth from '@/components/hoc/withAuth';
import UserLayout from '@/components/layouts/user/UserLayout';
import PrimaryLink from '@/components/links/PrimaryLink';
import { ScrollArea, ScrollBar } from '@/components/ScrollArea';
import Typography from '@/components/Typography';

import useGetRuanganOptions from '@/app/ruangan/hooks/useGetRuanganOptions';

import { ApiResponse } from '@/types/api';
import { Peminjaman } from '@/types/peminjaman';
import { Ruangan } from '@/types/ruangan';

type JadwalResponse = {
  tanggal: Date;
  ruangan: Ruangan[];
};

type FilterValues = {
  idRuangan: string[];
  tanggal: Date;
};

export function getHourlySlots(startHour = 7, endHour = 22) {
  const hours = [];
  for (let i = startHour; i < endHour; i++) {
    hours.push(i);
  }
  return hours;
}

// From jamAwal and jamAkhir, get the blocked hour range (e.g. 11 to 13 returns [11, 12])
export function getBlockedHours(jamAwal: Date, jamAkhir: Date): number[] {
  const start = new Date(jamAwal).getUTCHours();
  const end = new Date(jamAkhir).getUTCHours();
  const hours = [];
  for (let i = start; i < end; i++) {
    hours.push(i);
  }
  return hours;
}

export default withAuth(JadwalKetersediaanPage, 'user');
function JadwalKetersediaanPage() {
  const methods = useForm<FilterValues>({
    defaultValues: {
      tanggal: new Date(),
      idRuangan: [],
    },
  });

  const tanggal = useWatch({
    control: methods.control,
    name: 'tanggal',
  });
  const selectedIdRuangan = useWatch({
    control: methods.control,
    name: 'idRuangan',
  });

  const { listRuanganOptions, isLoadingRuangan } = useGetRuanganOptions();

  const { data: ruangan } = useQuery<ApiResponse<JadwalResponse>>({
    queryKey: ['ruangan', 'jadwal-ketersediaan', tanggal, selectedIdRuangan],
    queryFn: async () => {
      const res = await api.get(
        `/ruangan/jadwal?tanggal=${formatDateToLocalYYYYMMDD(
          tanggal
        )}&idRuangan=${selectedIdRuangan}`
      );
      return res.data;
    },
  });

  return (
    <UserLayout>
      <div className='flex flex-col gap-2'>
        <Typography variant='j2' className='text-primary-800'>
          Ketersediaan Ruangan
        </Typography>
        <Typography variant='s2' className='text-muted-foreground'>
          Lihat ketersediaan ruangan berdasarkan tanggal dan ruangan yang
          dipilih. Detail setiap ruangan dapat dilihat{' '}
          <PrimaryLink href='/ruangan'>disini</PrimaryLink>.
        </Typography>
      </div>
      <Card className='mt-8'>
        <CardHeader>
          <CardTitle>
            Hasil Ketersediaan Ruangan untuk {formatDateUTC(tanggal, false)}
          </CardTitle>
          <CardDescription>
            Pilih tanggal untuk melihat ketersediaan ruangan
          </CardDescription>
        </CardHeader>
        <CardContent className='-mt-2'>
          <div className='w-full'>
            <FormProvider {...methods}>
              <form className='w-full flex gap-2 flex-col lg:flex-row'>
                <DatePicker name='tanggal' className='w-full lg:w-1/3' />

                <Select
                  id='idRuangan'
                  label={null}
                  options={listRuanganOptions}
                  placeholder='Pilih Ruangan'
                  isLoading={isLoadingRuangan}
                  containerClassName='w-full lg:w-1/3'
                />
              </form>
            </FormProvider>
          </div>
          <div className='flex gap-4 mt-6 mb-2 text-primary'>
            <div className='flex items-center gap-1.5'>
              <div className='w-4 h-4 bg-green-200 border border-green-400 rounded' />
              <Typography variant='s3'>Tersedia</Typography>
            </div>
            <div className='flex items-center gap-1.5'>
              <div className='w-4 h-4 bg-red-200 border border-red-400 rounded' />
              <Typography variant='s3'>Terisi</Typography>
            </div>
          </div>

          <ScrollArea className='h-full w-full mt-8'>
            {ruangan &&
              ruangan.data.ruangan.map((item: Ruangan) => {
                const hourlySlots = getHourlySlots(7, 22);

                const blocked: Record<number, Peminjaman> = {};
                item.Peminjaman.forEach((jadwal: Peminjaman) => {
                  const hours = getBlockedHours(
                    jadwal.jamAwal,
                    jadwal.jamAkhir
                  );
                  hours.forEach((hour) => {
                    blocked[hour] = jadwal;
                  });
                });
                return (
                  <div key={item.idRuangan} className='mb-8'>
                    <Typography variant='h3' className='mb-0.5'>
                      {item.namaRuangan}
                    </Typography>
                    <div className='flex gap-1 mb-4 items-center'>
                      <Typography className='text-muted-foreground'>
                        Kapasitas: {item.kapasitas}
                      </Typography>
                      <User size={20} className='text-muted-foreground' />
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 text-sm'>
                      {hourlySlots.map((hour) => {
                        const isBlocked = blocked[hour];
                        return (
                          <div
                            key={hour}
                            className={cn(
                              'p-2 rounded border text-center flex items-center justify-center flex-col h-16 bg-green-100 text-green-800 border-green-300',
                              isBlocked &&
                                'bg-red-100 text-red-800 border-red-300 '
                            )}
                          >
                            {String(hour).padStart(2, '0')}:00 -{' '}
                            {String(hour + 1).padStart(2, '0')}:00
                            {isBlocked && (
                              <div className='mt-1'>
                                <span className='font-semibold'>
                                  {isBlocked.jenisKegiatan}
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </CardContent>
      </Card>
    </UserLayout>
  );
}
