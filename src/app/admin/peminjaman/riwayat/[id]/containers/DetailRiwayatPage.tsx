'use client';
import { useParams } from 'next/navigation';

import AdminLayout from '@/components/layouts/AdminLayout';

import DetailPeminjamanPage from '@/app/admin/peminjaman/containers/DetailPeminjamanPage';
import useGetPeminjamanDetail from '@/app/admin/peminjaman/hooks/useGetPeminjamanDetail';

export default function DetailRiwayatPage() {
  const { id } = useParams<{ id: string }>();
  const { peminjamanDetail, isLoading } = useGetPeminjamanDetail(id);
  return (
    <AdminLayout
      breadcrumbs={[
        '/admin',
        '/admin/peminjaman/riwayat',
        `/admin/peminjaman/riwayat/[id]`,
      ]}
      title='Detail Peminjaman'
      subheading='Detail peminjaman ruangan'
      backHref='/admin/peminjaman/riwayat'
      isLoading={isLoading}
    >
      <DetailPeminjamanPage data={peminjamanDetail?.data} />
    </AdminLayout>
  );
}
