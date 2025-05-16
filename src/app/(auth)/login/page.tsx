import { Metadata } from 'next';

import LoginPage from '@/app/(auth)/login/containers/LoginPage';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Halaman login pengguna',
};

export default function Page() {
  return <LoginPage />;
}
