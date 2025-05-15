'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import Button from '@/components/buttons/Button';
import NextImage from '@/components/NextImage';

interface RuanganCardProps {
  ruangan: string;
  image_url: string;
  id: string;
}

const RuanganCard = ({ ruangan, image_url, id }: RuanganCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/ruangan/${id}`);
  };

  return (
    <div className='flex flex-col justify-between h-full rounded-[12px] bg-white overflow-hidden'>
      <div className='relative w-full aspect-video'>
        <NextImage
          src={image_url}
          alt={ruangan}
          layout='fill'
          className='object-cover'
        />
      </div>
      <div className='p-5 flex flex-col gap-4'>
        <h2 className='text-[20px] font-semibold'>{ruangan}</h2>
        <Button className='w-full' onClick={handleClick}>
          Details
        </Button>
      </div>
    </div>
  );
};

export default RuanganCard;
