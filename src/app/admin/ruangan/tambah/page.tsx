import { Metadata } from 'next';

import TambahRuanganForm from '@/app/admin/ruangan/tambah/containers/TambahRuanganForm';

export const metadata: Metadata = {
  title: 'Tambah Ruangan',
  description: 'Halaman untuk menambah ruangan',
};

export default function Page() {
  return <TambahRuanganForm />;
}
