import { Ruangan } from '@/types/ruangan';
import { User } from '@/types/user';

export type Peminjaman = {
  idPeminjaman: number;
  User_idUser: number;
  Ruangan_idRuangan: number;
  tanggal: Date;
  jamAwal: Date;
  jamAkhir: Date;
  jenisKegiatan: string | null;
  status: 'approved' | 'waiting' | 'rejected' | 'canceled';
  deskripsi: string | null;
  Ruangan: Ruangan;
  User: User;
};
