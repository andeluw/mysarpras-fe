import { Peminjaman } from '@/types/peminjaman';

export type Ruangan = {
  idRuangan: number;
  namaRuangan: string;
  kapasitas: number;
  Gedung?: string | null;
  deskripsi?: string | null;
  gambar?: string | null;
  fasilitas?: string | null;
  Peminjaman: Peminjaman[];
};
