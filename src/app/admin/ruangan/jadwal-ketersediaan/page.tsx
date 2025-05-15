import { Metadata } from 'next';

import JadwalKetersediaanPage from '@/app/admin/ruangan/jadwal-ketersediaan/containers/JadwalKetersediaanPage';

export const metadata: Metadata = {
  title: 'Jadwal Ketersediaan Ruangan',
  description: 'Manajemen Ketersediaan Ruangan',
};

export default function Page() {
  return <JadwalKetersediaanPage />;
}
