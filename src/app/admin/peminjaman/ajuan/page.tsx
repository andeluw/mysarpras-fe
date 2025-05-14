import { Metadata } from 'next';

import AjuanPage from '@/app/admin/peminjaman/ajuan/containers/AjuanPage';

export const metadata: Metadata = {
  title: 'Ajuan Peminjaman',
  description: 'Kelola dan verifikasi ajuan peminjaman ruangan',
};

export default function Page() {
  return <AjuanPage />;
}
