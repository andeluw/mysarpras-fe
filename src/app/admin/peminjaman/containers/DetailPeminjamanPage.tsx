'use client';
import { Ban, Check, X } from 'lucide-react';

import { formatDateUTC, formatTimeRangeUTC } from '@/lib/date';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/Card';
import Typography from '@/components/Typography';

import StatusChip from '@/app/admin/peminjaman/components/StatusChip';
import UpdateStatusModal from '@/app/admin/peminjaman/components/UpdateStatusModal';

import { Peminjaman } from '@/types/peminjaman';

export default function DetailPeminjamanPage({
  data,
}: {
  data: Peminjaman | undefined;
}) {
  const userData = [
    {
      title: 'Nama',
      value: data?.User?.namaUser,
    },
    {
      title: 'Peran',
      value:
        (data?.User?.role ?? '').charAt(0).toUpperCase() +
        (data?.User?.role ?? '').slice(1),
    },
    {
      title: 'Email',
      value: data?.User?.email,
    },
    {
      title: 'Nomor Telepon',
      value: data?.User?.noTelp,
    },
  ];

  const peminjamanData = [
    {
      title: 'Ruangan',
      value: data?.Ruangan?.namaRuangan,
    },
    {
      title: 'Tanggal',
      value: data?.tanggal ? formatDateUTC(data.tanggal) : '-',
    },
    {
      title: 'Jam',
      value:
        data?.jamAwal && data?.jamAkhir
          ? formatTimeRangeUTC(data.jamAwal, data.jamAkhir)
          : '-',
    },
    {
      title: 'Jenis Kegiatan',
      value: data?.jenisKegiatan,
    },
  ];

  return (
    <div className='flex flex-col gap-8'>
      {data?.status && (
        <div className='flex gap-2'>
          <Typography variant='h5'>Status: </Typography>
          <StatusChip status={data.status} />
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Data Peminjam</CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
          {userData?.map((user) => (
            <div key={user.title} className='flex flex-col gap-1'>
              <Typography variant='s3'>{user.title}</Typography>
              <Typography variant='b2' className='text-muted-foreground'>
                {user.value != null &&
                user.value.length > 0 &&
                user.value != undefined
                  ? user.value
                  : '-'}
              </Typography>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Detail Peminjaman</CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
          {peminjamanData?.map((pinjaman) => (
            <div key={pinjaman.title} className='flex flex-col gap-1'>
              <Typography variant='s3'>{pinjaman.title}</Typography>
              <Typography variant='b2' className='text-muted-foreground'>
                {pinjaman.value != null &&
                pinjaman.value.length > 0 &&
                pinjaman.value != undefined
                  ? pinjaman.value
                  : '-'}
              </Typography>
            </div>
          ))}
          <div className='flex flex-col gap-1 sm:col-span-2'>
            <Typography variant='s3'>Alasan Peminjaman</Typography>
            <Typography variant='b2' className='text-muted-foreground'>
              {data?.deskripsi != null &&
              data.deskripsi.length > 0 &&
              data.deskripsi != undefined
                ? data.deskripsi
                : 'Digunakan untuk kegiatan presentasi proyek akhir di ruang seminar pada tanggal 20 Mei 2025.'}
            </Typography>
          </div>
        </CardContent>
      </Card>

      {data?.status === 'waiting' && (
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Aksi Pengajuan</CardTitle>
            <CardDescription>
              Pilih tindakan yang ingin diambil terhadap pengajuan peminjaman
              ini. Klik "Terima" untuk menyetujui, atau "Tolak" untuk
              membatalkan pengajuan.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex gap-2'>
            {/* Tolak */}
            <UpdateStatusModal
              id={data.idPeminjaman}
              title='Apakah anda yakin ingin menolak peminjaman ini?'
              description='Dengan menolak peminjaman ini, peminjam tidak akan dapat menggunakan ruangan yang telah dipilih.'
              status='rejected'
              actionText='Tolak'
              danger
              icon={X}
            />

            {/* Terima */}
            <UpdateStatusModal
              id={data.idPeminjaman}
              title='Apakah anda yakin ingin menyetujui peminjaman ini?'
              description='Dengan menyetujui peminjaman ini, peminjam akan dapat menggunakan ruangan yang telah dipilih.'
              status='approved'
              actionText='Terima'
              icon={Check}
            />
          </CardContent>
        </Card>
      )}

      {data?.status === 'approved' && (
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Batalkan Peminjaman</CardTitle>
            <CardDescription>
              Pengajuan peminjaman ini sudah disetujui. Anda dapat membatalkan
              peminjaman ini jika diperlukan.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex gap-2'>
            <UpdateStatusModal
              id={data.idPeminjaman}
              title='Apakah anda yakin ingin membatalkan peminjaman ini?'
              description='Dengan membatalkan peminjaman ini, peminjam tidak akan dapat menggunakan ruangan yang telah dipilih.'
              status='canceled'
              actionText='Batalkan'
              danger
              icon={Ban}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
