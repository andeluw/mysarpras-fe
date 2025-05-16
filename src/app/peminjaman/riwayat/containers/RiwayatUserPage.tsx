'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import api from '@/lib/api';
import {
  formatDateToLocalYYYYMMDD,
  formatDateUTC,
  formatTimeRangeUTC,
} from '@/lib/date';
import { buildPaginatedTableURL } from '@/lib/table';
import useServerTable from '@/hooks/useServerTable';

import { DatePicker } from '@/components/DatePicker';
import withAuth from '@/components/hoc/withAuth';
import UserLayout from '@/components/layouts/user/UserLayout';
import { PopupFilter, PopupFilterProps } from '@/components/table/PopupFilter';
import { ServerTable } from '@/components/table/ServerTable';
import Typography from '@/components/Typography';

import StatusChip from '@/app/admin/peminjaman/components/StatusChip';
import { jenisKegiatanOptions } from '@/constant/selectoption';

import { PaginatedApiResponse } from '@/types/api';
import { Peminjaman } from '@/types/peminjaman';

type UserFilter = {
  status: string[];
  jenisKegiatan: string[];
};

export default withAuth(RiwayatUserPage, 'user');
function RiwayatUserPage() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const { tableState, setTableState } = useServerTable<Peminjaman>();
  const columns: ColumnDef<Peminjaman>[] = [
    {
      accessorKey: 'Ruangan.namaRuangan',
      header: 'Ruangan',
      enableSorting: false,
    },
    {
      accessorKey: 'tanggal',
      header: 'Tanggal',
      cell: ({ getValue }) => {
        return <Typography>{formatDateUTC(getValue() as Date)}</Typography>;
      },
    },
    {
      header: 'Jam',
      id: 'jam',
      cell: ({ row }) => {
        const { jamAwal, jamAkhir } = row.original;
        return <Typography>{formatTimeRangeUTC(jamAwal, jamAkhir)}</Typography>;
      },
    },
    {
      accessorKey: 'jenisKegiatan',
      header: 'Jenis Kegiatan',
      enableSorting: false,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      enableSorting: false,
      cell: ({ getValue }) => {
        const status = getValue() as
          | 'approved'
          | 'rejected'
          | 'waiting'
          | 'canceled';
        return <StatusChip status={status} />;
      },
    },
  ];

  const [filterQuery, setFilterQuery] = React.useState<UserFilter>({
    status: [],
    jenisKegiatan: [],
  });

  const filterOption: PopupFilterProps<UserFilter>['filterOption'] =
    React.useMemo(
      () => [
        {
          id: 'status',
          name: 'Status',
          options: [
            { id: 'approved', name: 'Disetujui' },
            { id: 'rejected', name: 'Ditolak' },
            { id: 'canceled', name: 'Dibatalkan' },
          ],
        },
        {
          id: 'jenisKegiatan',
          name: 'Jenis Kegiatan',
          options: jenisKegiatanOptions.map((option) => ({
            name: option.label,
            id: option.value,
          })),
        },
      ],
      []
    );

  const url = buildPaginatedTableURL({
    baseUrl: '/peminjaman',
    tableState,
    additionalParam: {
      status:
        filterQuery.status.length > 0
          ? filterQuery.status
          : ['approved', 'rejected', 'canceled', 'waiting'],
      jenisKegiatan: filterQuery.jenisKegiatan,
      tanggal: date ? formatDateToLocalYYYYMMDD(date) : undefined,
    },
  });

  const { data: queryData, isLoading } = useQuery<
    PaginatedApiResponse<Peminjaman[]>
  >({
    queryKey: ['peminjaman', 'riwayat', url],
    queryFn: async () => {
      const res = await api.get<PaginatedApiResponse<Peminjaman[]>>(url);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  return (
    <UserLayout>
      <div className='flex flex-col gap-2 mb-8'>
        <Typography variant='j2' className='text-primary-800'>
          Riwayat Peminjaman
        </Typography>
        <Typography variant='s2' className='text-muted-foreground'>
          Berikut adalah riwayat peminjaman yang telah Anda lakukan.
        </Typography>
      </div>
      <ServerTable
        columns={columns}
        data={queryData}
        header={
          <div className='flex gap-1.5 sm:gap-1.5 md:gap-3'>
            <DatePicker
              value={date}
              onChange={(d) => setDate(d as Date)}
              placeholder='Tanggal'
            />
            <PopupFilter
              allowMultiple
              filterOption={filterOption}
              setFilterQuery={setFilterQuery}
            />
          </div>
        }
        isLoading={isLoading}
        tableState={tableState}
        setTableState={setTableState}
        withFilter
      />
    </UserLayout>
  );
}
