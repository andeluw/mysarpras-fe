import { ArrowRight, Hotel } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';

import { Navbar } from '@/components/layouts/user/Navbar';
import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/Typography';

export const metadata: Metadata = {
  title: 'Home | mySarpras',
  description: 'Sistem Manajemen Sarana dan Prasarana',
};

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <div className='flex items-center justify-center w-full h-[calc(100vh-81px)] bg-primary-50'>
        <div className='flex flex-col-reverse lg:flex-row gap-4 px-12 lg:gap-32 items-center justify-center w-full pb-20'>
          <div className='flex flex-col gap-3 md:gap-5 items-center justify-center lg:items-start text-center lg:text-left'>
            <Typography
              variant='j2'
              className='text-primary-800 md:text-4xl lg:text-5xl'
            >
              mySarpras
            </Typography>
            <Typography variant='h3' className='text-primary md:text-3xl'>
              Klik. Pilih. Pinjam. Selesai.
            </Typography>
            <div className='flex flex-col gap-3 md:gap-5 md:flex-row items-center justify-center lg:items-start'>
              <ButtonLink
                href='/peminjaman/form'
                className='w-full lg:w-fit'
                rightIcon={ArrowRight}
              >
                Pesan Sekarang
              </ButtonLink>
              <ButtonLink
                href='/ruangan/jadwal-ketersediaan'
                className='w-full lg:w-fit'
                variant='secondary'
                rightIcon={Hotel}
              >
                Cek Jadwal Ruangan
              </ButtonLink>
            </div>
          </div>
          <Image
            src='/images/homepage.png'
            alt='Landing Page'
            width={500}
            height={500}
            className='w-[200px] md:w-[300px] lg:w-[400px] object-cover'
            priority
          />
        </div>
      </div>
      {/* <Card className='flex items-center justify-center bg-yellow-100'>
        <div className='w-max h-max p-8 flex gap-6 flex-col items-center justify-center'>
          <div className='flex flex-row items-center justify-center gap-2 text-yellow-800'>
            <TriangleAlert />
            <Typography variant='h3'>Syarat dan Ketentuan</Typography>
          </div>
          <div className=' lg:max-w-72'>
            <ol type='1' className='list-decimal pl-5 space-y-2 text-sm'>
              <li>
                <p>
                  Mahasiswa bisa mengajukan peminjaman paling cepat 2 minggu
                  sebelumnya, dan paling lambat 3 hari sebelum digunakan.
                </p>
              </li>
              <li>
                <p>Dosen bisa mengajukan peminjaman kapan saja.</p>
              </li>
              <li>
                <p>
                  Pastikan tanggal peminjaman tidak bertabrakan dengan acara
                  lain.
                </p>
              </li>
              <li>
                <p>
                  Persetujuan reservasi oleh Admin yang bertanggung jawab atas
                  skala prioritas dengan kegiatan waktu yang sama.
                </p>
              </li>
              <li>
                <p>
                  Peminjam mengajukan permohonan peminjaman ruangan kepada Admin
                  yang bertanggung jawab.
                </p>
              </li>
            </ol>
          </div>
          <ButtonLink
            href='/ruangan/jadwal-ketersediaan'
            className='bg-yellow-800 text-white hover:bg-yellow-700 hover:text-white'
            variant='light'
            rightIcon={ChevronRight}
          >
            Cek Jadwal Ruangan
          </ButtonLink>
        </div>
      </Card> */}
    </main>
  );
}
