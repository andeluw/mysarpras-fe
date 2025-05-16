import { Metadata } from 'next';

import RoomDetailAdmin from '@/app/admin/ruangan/[roomId]/containers/RoomDetailAdmin';

export const metadata: Metadata = {
  title: 'Detail Ruangan',
  description: 'Halaman untuk melihat detail ruangan',
};

export default function Page() {
  return <RoomDetailAdmin />;
}
