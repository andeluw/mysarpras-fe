import { Metadata } from 'next';

import DetailRuanganPage from '@/app/ruangan/[roomId]/containers/DetailRuanganPage';

export const metadata: Metadata = {
  title: 'Detail Ruangan',
  description: 'Halaman untuk melihat detail ruangan',
};

export default function Page() {
  return <DetailRuanganPage />;
}
