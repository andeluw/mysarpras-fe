import { Metadata } from 'next';

import JadwalKetersediaanUserPage from '@/app/ruangan/jadwal-ketersediaan/containers/JadwalKetersediaanUserPage';

export const metadata: Metadata = {
  title: 'Jadwal Ketersediaan Ruangan',
  description: 'Temukan ketersediaan ruangan untuk kegiatan Anda',
};

export default function Page() {
  return <JadwalKetersediaanUserPage />;
}
