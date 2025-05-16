import { Metadata } from 'next';

import ResetPasswordPage from '@/app/profil/ubah-password/containers/ResetPasswordPage';

export const metadata: Metadata = {
  title: 'Ubah Password',
  description: 'Halaman untuk mengubah password',
};

export default function Page() {
  return <ResetPasswordPage />;
}
