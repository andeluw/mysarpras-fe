'use client';

import { Hotel } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';

import NextImage from '@/components/NextImage';

import FasilitasChip from '@/app/ruangan/[roomId]/components/FasilitasChip';

import { getRuanganById } from '@/types/test/mock';

const DetailPage = () => {
  const params = useParams();
  const roomId = params.roomId as string;
  const room = getRuanganById(roomId);

  if (!room) {
    return <div>Room not found</div>;
  }

  const facilities = room.fasilitas?.split(', ') || [];

  return (
    <div className='w-full min-h-screen flex flex-col pt-20 bg-gray-100'>
      <div className='imagew-full h-[200px]'>
        <NextImage
          src={room.gambar || ''}
          alt={room.namaRuangan}
          layout='fill'
          className='object-cover'
        />
      </div>
      <div className='bottom w-full h-[580px] bg-white pl-3 pr-3 md:pt-16 md:pb-16 gap-3'>
        <div className='flex flex-col p-3'>
          <h1 className='text-3xl pb-3'>{room.namaRuangan}</h1>
          <div className='flex flex-row text-gray-400 font-light text-sm'>
            <Hotel className='w-[19px] aspect-square' />
            <p>
              {room.Gedung} • {room.kapasitas} orang
            </p>
          </div>
        </div>
        <div className='flex flex-col p-3'>
          <h2>Fasilitas</h2>
          <div className='chips'>
            {facilities.map((facility, index) => (
              <FasilitasChip key={index} label={facility} />
            ))}
          </div>
        </div>
        <div className='flex flex-col p-3'>
          <h3 className='font-normal'>Deskripsi</h3>
          <p>{room.deskripsi}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
