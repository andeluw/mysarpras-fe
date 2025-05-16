'use client';
import { Plus } from 'lucide-react';
import React from 'react';

import withAuth from '@/components/hoc/withAuth';
import AdminLayout from '@/components/layouts/admin/AdminLayout';
import ButtonLink from '@/components/links/ButtonLink';

import RuanganCard from '@/app/ruangan/components/RuanganCard';
import { useGetAllRuangan } from '@/app/ruangan/hooks/useGetRuanganOptions';

import { Ruangan } from '@/types/ruangan';

export default withAuth(RuanganPage, 'admin');
function RuanganPage() {
  const { listRuanganData } = useGetAllRuangan();

  return (
    <AdminLayout
      breadcrumbs={['/admin', '/admin/ruangan']}
      title='Daftar Ruangan'
      subheading='Berikut adalah daftar ruangan yang tersedia untuk peminjaman. Silahkan pilih ruangan yang ingin dikelola.'
    >
      <div className='flex flex-col mb-8'>
        <ButtonLink
          href='/admin/ruangan/tambah'
          className='w-fit'
          rightIcon={Plus}
          size='md'
        >
          Tambah Ruangan
        </ButtonLink>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mt-10'>
          {listRuanganData?.data.map((room: Ruangan) => (
            <RuanganCard key={room.idRuangan} ruangan={room} isAdmin={true} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
