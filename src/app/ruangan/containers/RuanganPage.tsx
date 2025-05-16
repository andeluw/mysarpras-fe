'use client';
import React from 'react';

import withAuth from '@/components/hoc/withAuth';
import UserLayout from '@/components/layouts/user/UserLayout';
import Typography from '@/components/Typography';

import RuanganCard from '@/app/ruangan/components/RuanganCard';
import { useGetAllRuangan } from '@/app/ruangan/hooks/useGetRuanganOptions';

import { Ruangan } from '@/types/ruangan';

export default withAuth(RuanganPage, 'user');
function RuanganPage() {
  const { listRuanganData } = useGetAllRuangan();

  return (
    <UserLayout>
      <div className='flex flex-col gap-2 mb-8'>
        <Typography variant='j2' className='text-primary-800'>
          Daftar Ruangan
        </Typography>
        <Typography variant='s2' className='text-muted-foreground'>
          Berikut adalah daftar ruangan yang tersedia untuk peminjaman.
        </Typography>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mt-10'>
        {listRuanganData?.data.map((room: Ruangan) => (
          <RuanganCard key={room.idRuangan} ruangan={room} />
        ))}
      </div>
    </UserLayout>
  );
}
