import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useMemo } from 'react';

import api from '@/lib/api';

import Select from '@/components/forms/Select';

import {
  getBlockedHours,
  getHourlySlots,
} from '@/app/ruangan/jadwal-ketersediaan/containers/JadwalKetersediaanUserPage';
import { timeSlotsOptions, timeSlotsOptions2 } from '@/constant/selectoption';

import { ApiResponse } from '@/types/api';
import { Peminjaman } from '@/types/peminjaman';

interface TimeSelectorProps {
  selectedIdRuangan: number;
  selectedDate: Date;
  selectedJamAwal: string | null; // Format: HH:mm
}

export default function TimeSelector({
  selectedIdRuangan,
  selectedDate,
  selectedJamAwal,
}: TimeSelectorProps) {
  const { data: peminjamanData, isLoading: isLoadingPeminjaman } = useQuery<
    ApiResponse<Peminjaman[]>
  >({
    queryKey: ['peminjaman', 'list', selectedIdRuangan, selectedDate],
    queryFn: async () => {
      const res = await api.get(
        `/peminjaman/getPeminjamanByRuanganId/${selectedIdRuangan}?tanggal=${format(
          selectedDate,
          'yyyy-MM-dd'
        )}`
      );
      return res.data;
    },
    enabled: !!selectedIdRuangan && !!selectedDate,
  });

  // Flatten blocked hours into a number array, e.g. [12,13, ...]
  const blockedHours = useMemo(() => {
    if (!peminjamanData?.data) return [];

    return peminjamanData.data.flatMap((b) =>
      getBlockedHours(new Date(b.jamAwal), new Date(b.jamAkhir))
    );
  }, [peminjamanData]);

  // Filter jamAwal options: exclude blocked hours
  const jamAwalOptions = useMemo(() => {
    const validStartHours = getHourlySlots(7, 22).filter(
      (h) => !blockedHours.includes(h)
    );

    return timeSlotsOptions.filter((opt) =>
      validStartHours.includes(parseInt(opt.value.split(':')[0]))
    );
  }, [blockedHours]);

  // Filter jamAkhir options based on selected jamAwal and next blocked hour
  const jamAkhirOptions = useMemo(() => {
    if (!selectedJamAwal) return [];

    const selectedHour = parseInt(selectedJamAwal.split(':')[0]);

    // Find the next blocked hour after selectedHour
    const nextBlocked =
      blockedHours.filter((h) => h > selectedHour).sort((a, b) => a - b)[0] ??
      22;

    const validEndHours = getHourlySlots(7, 23).filter(
      (h) => h > selectedHour && h <= nextBlocked
    );

    return timeSlotsOptions2.filter((opt) =>
      validEndHours.includes(parseInt(opt.value.split(':')[0]))
    );
  }, [selectedJamAwal, blockedHours]);

  return (
    <div className='flex flex-row w-full gap-4'>
      <div className='w-full'>
        <Select
          id='jamAwal'
          label='Jam Awal'
          placeholder='Pilih Jam'
          options={jamAwalOptions}
          disabled={!selectedIdRuangan || isLoadingPeminjaman || !selectedDate}
          validation={{
            required: {
              value: true,
              message: 'Jam awal tidak boleh kosong',
            },
          }}
        />
      </div>
      <div className='w-full'>
        <Select
          id='jamAkhir'
          label='Jam Akhir'
          placeholder='Pilih Jam'
          options={jamAkhirOptions}
          disabled={!selectedJamAwal}
          validation={{
            required: {
              value: true,
              message: 'Jam akhir tidak boleh kosong',
            },
          }}
        />
      </div>
    </div>
  );
}
