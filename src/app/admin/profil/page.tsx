import { Metadata } from 'next';

import AdminProfilePage from '@/app/admin/profil/containers/AdminProfilePage';

export const metadata: Metadata = {
  title: 'Profil Admin',
  description: 'Halaman untuk melihat profil admin',
};

export default function Page() {
  return <AdminProfilePage />;
}
