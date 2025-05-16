'use client';

import { User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { imageUrl } from '@/lib/api';

import { Card } from '@/components/Card';
import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/Typography';

import { Ruangan } from '@/types/ruangan';

interface RuanganCardProps {
  ruangan: Ruangan;
  isAdmin?: boolean;
}

const RuanganCard = ({ ruangan, isAdmin = false }: RuanganCardProps) => {
  return (
    <Card className='flex flex-col justify-between h-full overflow-hidden'>
      <div className='relative w-full aspect-video'>
        {ruangan.gambar ? (
          <Image
            src={ruangan.gambar ? imageUrl(ruangan.gambar, false) : ''}
            alt={ruangan.namaRuangan}
            layout='fill'
            className='object-cover'
          />
        ) : (
          <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
            <Typography variant='b3' className='text-muted-foreground'>
              Gambar tidak tersedia
            </Typography>
          </div>
        )}
      </div>
      <div className='p-5 flex flex-col gap-5'>
        <div className='flex gap-1.5 justify-center flex-col'>
          <Typography variant='h3'>{ruangan.namaRuangan}</Typography>
          <Typography variant='b3' className='text-muted-foreground'>
            {ruangan.kapasitas}
            <User size={16} className='inline-block ml-1' />
          </Typography>
        </div>
        <ButtonLink
          className='w-full'
          href={
            isAdmin
              ? `/admin/ruangan/${ruangan.idRuangan}`
              : `/ruangan/${ruangan.idRuangan}`
          }
        >
          Lihat Detail
        </ButtonLink>
      </div>
    </Card>
  );
};

export default RuanganCard;
