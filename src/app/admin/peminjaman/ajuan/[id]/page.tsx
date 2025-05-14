import { Metadata } from 'next';

import DetailAjuanPage from '@/app/admin/peminjaman/ajuan/[id]/containers/DetailAjuanPage';

export const metadata: Metadata = {
  title: 'Detail Ajuan Peminjaman',
  description: 'Detail ajuan peminjaman ruangan',
};

export default function Page() {
  return <DetailAjuanPage />;
}
