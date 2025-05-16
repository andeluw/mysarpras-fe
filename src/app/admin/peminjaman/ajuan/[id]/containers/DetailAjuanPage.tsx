'use client';
import { useParams } from 'next/navigation';

import withAuth from '@/components/hoc/withAuth';
import AdminLayout from '@/components/layouts/admin/AdminLayout';

import DetailPeminjamanPage from '@/app/admin/peminjaman/containers/DetailPeminjamanPage';
import useGetPeminjamanDetail from '@/app/admin/peminjaman/hooks/useGetPeminjamanDetail';

export default withAuth(DetailAjuanPage, 'admin');
function DetailAjuanPage() {
  const { id } = useParams<{ id: string }>();
  const { peminjamanDetail, isLoading } = useGetPeminjamanDetail(id);
  return (
    <AdminLayout
      breadcrumbs={[
        '/admin',
        '/admin/peminjaman/ajuan',
        `/admin/peminjaman/ajuan/[id]`,
      ]}
      title='Detail Ajuan'
      subheading='Detail ajuan peminjaman ruangan'
      backHref='/admin/peminjaman/ajuan'
      isLoading={isLoading}
    >
      <DetailPeminjamanPage data={peminjamanDetail?.data} />
    </AdminLayout>
  );
}
