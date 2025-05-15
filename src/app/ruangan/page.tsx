import React from 'react';

import RuanganCard from '@/app/ruangan/components/RuanganCard';

import { getRuangan } from '@/types/test/mock';

const RuanganPage = () => {
  const roomData = getRuangan();

  return (
    <div className='bg-gray-200 min-h-screen w-full p-20 md:p-52'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {roomData.map((room) => (
            <RuanganCard
              key={room.idRuangan}
              id={room.idRuangan.toString()}
              ruangan={room.namaRuangan}
              image_url={room.gambar || ''}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RuanganPage;
