import {
  Building2,
  CalendarCheck2,
  ChartColumn,
  FileInput,
  FilePlus,
  History,
  HousePlus,
} from 'lucide-react';
import { Metadata } from 'next';

import AdminLayout from '@/components/layouts/AdminLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/Typography';

export const metadata: Metadata = {
  title: 'Dashboard Admin',
  description: 'Dashboard Admin',
};

const availablePages = [
  {
    title: 'Manajemen Peminjaman',
    caption: 'Kelola seluruh proses peminjaman ruangan dan riwayat penggunaan',
    pages: [
      {
        title: 'Ajuan Peminjaman',
        url: '/admin/peminjaman/ajuan',
        caption: 'Kelola dan verifikasi ajuan peminjaman ruangan',
        icon: FileInput,
      },
      {
        title: 'Riwayat Peminjaman',
        url: '/admin/peminjaman/riwayat',
        caption: 'Lacak status peminjaman beserta riwayat lengkap',
        icon: History,
      },
      {
        title: 'Buat Peminjaman',
        url: '/admin/peminjaman/buat',
        caption: 'Buat peminjaman manual untuk kebutuhan khusus',
        icon: FilePlus,
      },
    ],
  },
  {
    title: 'Manajemen Ruangan',
    caption: 'Pengaturan data master dan ketersediaan ruangan',
    pages: [
      {
        title: 'Jadwal Ketersediaan',
        url: '/admin/ruangan/jadwal-ketersediaan',
        caption: 'Pantau jadwal ketersediaan ruangan secara real-time',
        icon: CalendarCheck2,
      },
      {
        title: 'Daftar Ruangan',
        url: '/admin/ruangan/daftar-ruangan',
        caption: 'Lihat dan kelola semua ruangan yang ada',
        icon: Building2,
      },
      {
        title: 'Tambah Ruangan',
        url: '/admin/ruangan/tambah',
        caption: 'Tambahkan data ruangan baru',
        icon: HousePlus,
      },
    ],
  },
  {
    title: 'Analisis Peminjaman',
    caption: 'Data statistik dan laporan penggunaan ruangan',
    pages: [
      {
        title: 'Statistik Analitik',
        url: '/admin/statistik',
        caption: 'Hasil rekapitulasi aktivitas peminjaman',
        icon: ChartColumn,
      },
    ],
  },
];

export default function Page() {
  return (
    <AdminLayout breadcrumbs={['/admin']} title='Dashboard Admin'>
      <div className='flex flex-col gap-8'>
        {availablePages.map((section) => (
          <div
            key={section.title}
            className='flex flex-col gap-1 bg-white py-6 px-8 rounded-lg shadow-md'
          >
            <Typography variant='h2'>{section.title}</Typography>
            <Typography
              variant='s3'
              className='text-muted-foreground font-normal'
            >
              {section.caption}
            </Typography>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-3'>
              {section.pages.map((page) => (
                <UnstyledLink
                  key={page.title}
                  href={page.url}
                  className='flex flex-col items-center justify-center gap-1.5 rounded-lg border border-border p-4 text-center transition-colors hover:bg-primary-50'
                >
                  <div className='flex items-center justify-center w-14 h-14 rounded-md bg-primary-100 text-primary-800 p-2'>
                    <page.icon className='h-8 w-8 text-primary-800' />
                  </div>
                  <Typography
                    variant='s3'
                    className='text-primary-800 font-semibold mt-2'
                  >
                    {page.title}
                  </Typography>
                  <Typography variant='s4' className='text-muted-foreground'>
                    {page.caption}
                  </Typography>
                </UnstyledLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
