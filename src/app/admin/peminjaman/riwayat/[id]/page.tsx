import { Metadata } from 'next';

import DetailRiwayatPage from '@/app/admin/peminjaman/riwayat/[id]/containers/DetailRiwayatPage';

export const metadata: Metadata = {
  title: 'Detail Riwayat Peminjaman',
  description: 'Detail riwayat peminjaman ruangan',
};

export default function Page() {
  return <DetailRiwayatPage />;
}
