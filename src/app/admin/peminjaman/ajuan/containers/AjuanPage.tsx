'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import React from 'react';

import api from '@/lib/api';
import { buildPaginatedTableURL } from '@/lib/table';
import useServerTable from '@/hooks/useServerTable';

import { DatePicker } from '@/components/DatePicker';
import AdminLayout from '@/components/layouts/AdminLayout';
import IconLink from '@/components/links/IconLink';
import { PopupFilter, PopupFilterProps } from '@/components/table/PopupFilter';
import { ServerTable } from '@/components/table/ServerTable';
import Typography from '@/components/Typography';

import { LOCALE } from '@/constant/common';
import { jenisKegiatanOptions } from '@/constant/selectoption';

import { PaginatedApiResponse } from '@/types/api';
import { Peminjaman } from '@/types/peminjaman';

type UserFilter = {
  jenisKegiatan: string[];
};

export default function AjuanPage() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const { tableState, setTableState } = useServerTable<Peminjaman>();
  const columns: ColumnDef<Peminjaman>[] = [
    {
      accessorKey: 'User.namaUser',
      header: 'Nama',
      size: 200,
      enableSorting: false,
    },
    {
      accessorKey: 'Ruangan.namaRuangan',
      header: 'Ruangan',
      enableSorting: false,
    },
    {
      accessorKey: 'tanggal',
      header: 'Tanggal',
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string).toLocaleDateString(LOCALE, {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
        return <Typography>{date}</Typography>;
      },
    },
    {
      header: 'Jam',
      id: 'jam',
      cell: ({ row }) => {
        const { jamAwal, jamAkhir } = row.original;
        const timeFormatter = new Intl.DateTimeFormat(LOCALE, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        const start = timeFormatter.format(new Date(jamAwal));
        const end = timeFormatter.format(new Date(jamAkhir));
        return (
          <Typography>
            {start} - {end}
          </Typography>
        );
      },
    },
    {
      accessorKey: 'jenisKegiatan',
      header: 'Jenis Kegiatan',
      enableSorting: false,
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => {
        const { idPeminjaman } = row.original;
        const url = `/admin/peminjaman/ajuan/${idPeminjaman}`;
        return <IconLink href={url} variant='outline' icon={Eye} />;
      },
    },
  ];

  const [filterQuery, setFilterQuery] = React.useState<UserFilter>({
    jenisKegiatan: [],
  });

  const filterOption: PopupFilterProps<
    Omit<UserFilter, 'tanggal'>
  >['filterOption'] = React.useMemo(
    () => [
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
      status: 'waiting',
      jenisKegiatan: filterQuery.jenisKegiatan,
      tanggal: date
        ? new Date(date.getTime() + 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0]
        : undefined,
    },
  });

  const { data: queryData, isLoading } = useQuery<
    PaginatedApiResponse<Peminjaman[]>
  >({
    queryKey: ['peminjaman', url],
    queryFn: async () => {
      const res = await api.get<PaginatedApiResponse<Peminjaman[]>>(url);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
  return (
    <AdminLayout
      breadcrumbs={['/admin', '/admin/peminjaman/ajuan']}
      title='Ajuan Peminjaman'
      subheading='Daftar ajuan peminjaman ruangan yang menunggu persetujuan'
    >
      <ServerTable
        columns={columns}
        data={queryData}
        header={
          <div className='flex gap-3'>
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
    </AdminLayout>
  );
}
