import {
  Building2,
  CalendarCheck2,
  FileInput,
  FilePlus,
  History,
  HousePlus,
  LockKeyhole,
  User,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/Card';
import AdminLayout from '@/components/layouts/admin/AdminLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/Typography';

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
        url: '/admin/peminjaman/form',
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
        url: '/admin/ruangan',
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
    title: 'Manajemen Akun',
    caption: 'Kelola informasi dan kredensial akun administrator',
    pages: [
      {
        title: 'Profil Saya',
        url: '/admin/profil',
        caption: 'Lihat dan perbarui detail akun admin Anda',
        icon: User,
      },
      {
        title: 'Ubah Password',
        url: '/admin/ubah-password',
        caption: 'Perbarui kata sandi untuk keamanan akun Anda',
        icon: LockKeyhole,
      },
    ],
  },
];

export default function DashboardAdminPage() {
  return (
    <AdminLayout
      breadcrumbs={['/admin']}
      title='Dashboard Admin'
      subheading='Selamat datang di dashboard admin. Kelola semua proses peminjaman ruangan dengan mudah.'
    >
      <div className='flex flex-col gap-8'>
        {availablePages.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.caption}</CardDescription>
            </CardHeader>
            <CardContent className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
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
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
