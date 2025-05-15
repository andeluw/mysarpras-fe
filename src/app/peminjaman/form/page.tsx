import React from 'react';

import UserLayout from '@/components/layouts/user/UserLayout';

import RoomRequestForm from './component/RoomRequestForm';

export default function RequestPage() {
  return (
    <UserLayout>
      <div
        className='min-h-screen w-full p-12 bg-gray-100 flex justify-center items-center'
        style={{
          backgroundImage: 'url()',
          backgroundSize: '100% 100%',
        }}
      >
        <div className='bg-white md:w-[750px] sm:w-[450px] h-max drop-shadow-sm md:pt-[64px] md:pb-[75px] md:pl-[85px] md:pr-[85px]'>
          <RoomRequestForm />
        </div>
      </div>
    </UserLayout>
  );
}
