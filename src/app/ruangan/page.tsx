import { Metadata } from 'next';

import RuanganPage from '@/app/ruangan/containers/RuanganPage';

export const metadata: Metadata = {
  title: 'Daftar Ruangan',
  description: 'Halaman untuk melihat semua ruangan',
};

export default function Page() {
  return <RuanganPage />;
}
