'use client';

import { User } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

import { imageUrl } from '@/lib/api';

import { Card, CardContent } from '@/components/Card';
import withAuth from '@/components/hoc/withAuth';
import AdminLayout from '@/components/layouts/admin/AdminLayout';
import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/Typography';

import NotFound from '@/app/not-found';
import FasilitasChip from '@/app/ruangan/[roomId]/components/FasilitasChip';
import { useGetAllRuangan } from '@/app/ruangan/hooks/useGetRuanganOptions';

import { Ruangan } from '@/types/ruangan';

export default withAuth(DetailRuanganPage, 'admin');
function DetailRuanganPage() {
  const params = useParams();
  const roomId = params.roomId as string;

  const { listRuanganData } = useGetAllRuangan();

  const selectedRuangan = listRuanganData?.data.find(
    (ruangan: Ruangan) => ruangan.idRuangan === Number(roomId)
  );

  if (!roomId || !selectedRuangan) {
    return <NotFound />;
  }

  const facilities = selectedRuangan.fasilitas?.split(',') || [];

  return (
    <AdminLayout
      breadcrumbs={['/admin', '/admin/ruangan', `/admin/ruangan/[id]`]}
      title='Detail Ruangan'
      subheading='Detail ruangan'
      backHref='/admin/ruangan'
    >
      <Card className='flex flex-col justify-between h-full overflow-hidden'>
        <div className='relative  h-full w-full aspect-video'>
          {selectedRuangan.gambar ? (
            <Image
              src={
                selectedRuangan.gambar
                  ? imageUrl(selectedRuangan.gambar, false)
                  : ''
              }
              alt={selectedRuangan.namaRuangan}
              layout='fill'
              className='object-cover'
            />
          ) : (
            <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
              <Typography variant='b3' className='text-muted-foreground'>
                Gambar tidak tersedia
              </Typography>
            </div>
          )}
        </div>
        <CardContent className='p-10 flex flex-col gap-5'>
          <ButtonLink
            href={`/admin/ruangan/edit/${selectedRuangan.idRuangan}`}
            className='mb-3 w-fit'
            size='md'
          >
            Edit Ruangan
          </ButtonLink>
          <Typography variant='j2'>{selectedRuangan.namaRuangan}</Typography>
          <div className='flex items-center gap-2 text-primary'>
            <Typography variant='h3'>Kapasitas:</Typography>
            <Typography variant='h3' className='text-primary-800'>
              {selectedRuangan.kapasitas}
              <User size={20} className='inline-block ml-1' />
            </Typography>
          </div>
          <div className='flex items-center gap-2 text-primary'>
            <Typography variant='h3'>Gedung:</Typography>
            <Typography variant='h3' className='text-primary-800'>
              {selectedRuangan.Gedung}
            </Typography>
          </div>
          <div className='flex flex-wrap gap-4'>
            <Typography variant='h3' className='text-primary'>
              Fasilitas:
            </Typography>
            <div className='flex flex-wrap gap-2'>
              {facilities.map((facility, index) => (
                <FasilitasChip key={index} label={facility} />
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Typography variant='h3' className='text-primary'>
              Deskripsi
            </Typography>
            <Typography variant='s2' className='text-primary-700 font-semibold'>
              {selectedRuangan.deskripsi}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
