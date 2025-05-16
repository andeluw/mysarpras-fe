import { Metadata } from 'next';

import UserLayout from '@/components/layouts/user/UserLayout';

import RoomRequestForm from './component/RoomRequestForm';

export const metadata: Metadata = {
  title: 'Buat Peminjaman',
  description: 'Halaman untuk mengajukan peminjaman ruangan',
};

export default function RequestPage() {
  return (
    <UserLayout>
      <RoomRequestForm />
    </UserLayout>
  );
}
