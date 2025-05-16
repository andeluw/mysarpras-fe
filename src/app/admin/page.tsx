import { Metadata } from 'next';

import DashboardAdminPage from '@/app/admin/(homepage-admin)/DashboardAdminPage';

export const metadata: Metadata = {
  title: 'Dashboard Admin',
  description: 'Dashboard Admin',
};

export default function Page() {
  return <DashboardAdminPage />;
}
