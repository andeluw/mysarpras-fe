import { Ruangan } from '@/types/ruangan';

export const mockRuangan: Ruangan[] = [
  {
    idRuangan: 1,
    namaRuangan: 'Teater A',
    kapasitas: 200,
    Gedung: 'Teknik Sipil',
    deskripsi:
      'Ruang teater dengan kapasitas besar, dilengkapi dengan sistem audio visual modern dan AC.',
    gambar: '/images/teater-a.jpg',
    fasilitas: 'Proyektor, Sound System, Podium, AC, Whiteboard',
    Peminjaman: [],
  },
  {
    idRuangan: 2,
    namaRuangan: 'Teater B',
    kapasitas: 150,
    Gedung: 'Teknik Sipil',
    deskripsi:
      'Ruang teater medium dengan layout fleksibel untuk berbagai kegiatan.',
    gambar: '/images/teater-b.jpg',
    fasilitas: 'Proyektor, Sound System, AC, Meja Lipat',
    Peminjaman: [],
  },
];

export const getRuanganById = (id: string | number): Ruangan | undefined => {
  const numericId = typeof id === 'string' ? parseInt(id) : id;
  return mockRuangan.find((room) => room.idRuangan === numericId);
};

export const getRuangan = (): Ruangan[] => {
  return mockRuangan;
};
