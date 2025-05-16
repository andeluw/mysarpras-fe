import { Metadata } from 'next';

import ResetPassAdminPage from '@/app/admin/profil/ubah-password/containers/ResetPassAdminPage';

export const metadata: Metadata = {
  title: 'Ubah Password',
  description: 'Ubah password admin',
};

export default function Page() {
  return <ResetPassAdminPage />;
}
