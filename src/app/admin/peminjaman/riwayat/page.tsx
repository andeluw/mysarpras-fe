import { Metadata } from 'next';

import RiwayatPage from '@/app/admin/peminjaman/riwayat/containers/RiwayatPage';

export const metadata: Metadata = {
  title: 'Riwayat Peminjaman',
  description: 'Lacak status peminjaman beserta riwayat lengkap',
};

export default function Page() {
  return <RiwayatPage />;
}
