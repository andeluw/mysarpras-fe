import { Metadata } from 'next';

import ProfilePage from '@/app/profil/containers/ProfilePage';

export const metadata: Metadata = {
  title: 'Profil',
  description: 'Halaman untuk melihat profil',
};

export default function Page() {
  return <ProfilePage />;
}
