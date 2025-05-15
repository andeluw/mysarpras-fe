'use client';

import { CircleUserRound } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';

const Navbar = () => {
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Peminjaman',
      href: '/room-request',
    },
    {
      name: 'Ruangan',
      href: '/ruangan',
    },
  ];

  return (
    <nav className='bg-white w-full h-20 flex flex-row items-center drop-shadow-sm'>
      {/*Logo section */}
      <div className='w-72 flex flex-row items-center justify-center'>
        <NextImage src='/images/logo' alt='logo' layout='fill' />
        <div className='text-blue-500'>
          <h4>MySarpras</h4>
        </div>
      </div>

      <div className='h-10 w-[1px] bg-gray-200 rounded-full' />

      {/*Navigation links */}
      <div className='w-full flex flex-row gap-4 items-center justify-end'>
        {navigation.map((item, index) => (
          <UnstyledLink
            key={index}
            href={item.href}
            className={cn(
              'px-6 py-3 text-gray-700 hover:text-primary-500 transition-colors',
              pathname === item.href && 'text-primary-500'
            )}
          >
            {item.name}
          </UnstyledLink>
        ))}
      </div>

      <div className='h-10 w-[1px] bg-gray-200 rounded-full' />

      {/* User Profile */}
      <div className='w-72 px-9 py-2 flex justify-center items-center'>
        <div
          className='w-full flex p-3 flex-row justify-center items-center gap-2 rounded-xl'
          style={{
            boxShadow: '0 0 4px 3px rgba(0,0,0, 0.05)',
          }}
        >
          <CircleUserRound />
          <h5>Nama user</h5>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
