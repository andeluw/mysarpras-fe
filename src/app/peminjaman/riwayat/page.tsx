import { Metadata } from 'next';

import RiwayatUserPage from '@/app/peminjaman/riwayat/containers/RiwayatUserPage';

export const metadata: Metadata = {
  title: 'Riwayat Peminjaman',
  description: 'Halaman untuk melihat riwayat peminjaman',
};

export default function Page() {
  return <RiwayatUserPage />;
}
