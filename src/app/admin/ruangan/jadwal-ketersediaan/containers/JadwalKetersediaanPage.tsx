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
import AdminLayout from '@/components/layouts/AdminLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import { ScrollArea, ScrollBar } from '@/components/ScrollArea';
import Typography from '@/components/Typography';

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

function getHourlySlots(startHour = 7, endHour = 22) {
  const hours = [];
  for (let i = startHour; i < endHour; i++) {
    hours.push(i);
  }
  return hours;
}

// From jamAwal and jamAkhir, get the blocked hour range (e.g. 11 to 13 returns [11, 12])
function getBlockedHours(jamAwal: Date, jamAkhir: Date): number[] {
  const start = new Date(jamAwal).getUTCHours();
  const end = new Date(jamAkhir).getUTCHours();
  const hours = [];
  for (let i = start; i < end; i++) {
    hours.push(i);
  }
  return hours;
}

export default function JadwalKetersediaanPage() {
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

  const { data: listRuanganData, isLoading: isLoadingRuangan } = useQuery<
    ApiResponse<Ruangan[]>
  >({
    queryKey: ['ruangan', 'list'],
    queryFn: async () => {
      const res = await api.get('/ruangan');
      return res.data;
    },
  });

  const listRuangan = React.useMemo(() => {
    if (listRuanganData) {
      return listRuanganData.data.map((ruangan) => ({
        label: ruangan.namaRuangan,
        value: String(ruangan.idRuangan),
      }));
    }
    return [];
  }, [listRuanganData]);

  const { data: ruangan, isLoading } = useQuery<ApiResponse<JadwalResponse>>({
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
    <AdminLayout
      title='Jadwal Ketersediaan Ruangan'
      subheading='Manajemen Ketersediaan Ruangan'
      breadcrumbs={['/admin', '/admin/ruangan/jadwal-ketersediaan']}
      isLoading={isLoading || isLoadingRuangan}
    >
      <Card>
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
                  options={listRuangan}
                  placeholder='Pilih Ruangan'
                  isLoading={isLoadingRuangan}
                  containerClassName='w-full lg:w-1/3'
                />
              </form>
            </FormProvider>
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
                        return isBlocked ? (
                          <UnstyledLink
                            href={`/admin/peminjaman/riwayat/${isBlocked.idPeminjaman}`}
                            key={hour}
                            className={cn(
                              'p-2 rounded border text-center flex items-center justify-center flex-col h-16 bg-red-100 text-red-800 border-red-300 hover:bg-red-200 hover:text-red-900'
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
                          </UnstyledLink>
                        ) : (
                          <div
                            key={hour}
                            className={cn(
                              'p-2 rounded border text-center flex items-center justify-center flex-col h-16 bg-green-100 text-green-800 border-green-300'
                            )}
                          >
                            {String(hour).padStart(2, '0')}:00 -{' '}
                            {String(hour + 1).padStart(2, '0')}:00
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
    </AdminLayout>
  );
}
