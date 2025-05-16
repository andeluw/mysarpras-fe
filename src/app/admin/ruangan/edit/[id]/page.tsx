import { Metadata } from 'next';

import EditRuanganForm from '@/app/admin/ruangan/edit/[id]/containers/EditRuanganForm';

export const metadata: Metadata = {
  title: 'Edit Ruangan',
  description: 'Halaman untuk mengedit ruangan',
};

export default function Page() {
  return <EditRuanganForm />;
}
