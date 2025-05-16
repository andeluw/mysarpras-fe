import { Metadata } from 'next';

import RegisterPage from '@/app/(auth)/register/containers/RegisterPage';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Halaman pendaftaran pengguna baru',
};

export default function Page() {
  return <RegisterPage />;
}
