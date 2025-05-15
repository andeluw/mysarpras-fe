import React from 'react';

import { Navbar } from '@/components/layouts/user/Navbar';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className='layout py-12 px-4'>{children}</div>
    </div>
  );
}
