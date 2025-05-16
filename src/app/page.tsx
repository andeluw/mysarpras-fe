import { ChevronRight, TriangleAlert } from 'lucide-react';

import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';

export default function HomePage() {
  return (
    <div className='flex flex-col lg:flex-row pt-20 w-full min-h-screen bg-gray-200'>
      <div></div>

      <div className='w-full flex items-center justify-center px-11 py-64'>
        <div className='w-full flex flex-col gap-4'>
          <h1 className='font-normal text-7xl'>MySarpras</h1>
          <p className='font-light text-xl'>Klik. Pilih. Pinjam. Selesai</p>
          <ButtonLink
            href='/room-request'
            className='max-w-52 items-center flex flex-row justify-center p-3'
          >
            Book Now <ChevronRight />
          </ButtonLink>
        </div>
      </div>
      <div className='w-full flex items-center justify-center'>
        <div className='bg-white w-max h-max py-12 px-6 rounded-xl flex gap-6 flex-col'>
          <div className='flex flex-row items-center justify-center gap-2'>
            <TriangleAlert />
            <h3 className='font-normal text-xl'>Syarat dan ketentuan</h3>
          </div>
          <div className='max-w-72'>
            <ol type='1' className='list-decimal pl-5 space-y-2 text-sm'>
              <li>
                <p>
                  Mahasiswa bisa mengajukan peminjaman paling cepat 2 minggu
                  sebelumnya, dan paling lambat 3 hari sebelum digunakan
                </p>
              </li>
              <li>
                <p>Dosen bisa mengajukan peminjaman kapan saja</p>
              </li>
              <li>
                <p>
                  Pastikan tanggal peminjaman tidak bertabrakan dengan acara
                  lain
                </p>
              </li>
              <li>
                <p>
                  Persetujuan reservasi oleh Admin yang bertanggung jawab atas
                  skala prioritas dengan kegiatan waktu yang sama
                </p>
              </li>
              <li>
                <p>
                  Peminjam mengajukan permohonan peminjaman ruangan kepada Admin
                  yang bertanggung jawab
                </p>
              </li>
            </ol>
          </div>
          <div className='text-center'>
            <p>
              Lihat jadwal{' '}
              <span>
                <UnstyledLink href='/ruangan/jadwal-ketersediaan'>
                  disini.
                </UnstyledLink>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
