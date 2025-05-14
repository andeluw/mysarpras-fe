import { ApiResponse } from '@/types/api';

export interface User {
  idUser: number;
  namaUser: string;
  email: string;
  noTelp: string;
  role: string;
  kartuTandaPengenal: string | null;
}

export interface Ruangan {
  idRuangan: number;
  namaRuangan: string;
  kapasitas: number;
}

export interface Peminjaman {
  idPeminjaman: number;
  User_idUser: number;
  Ruangan_idRuangan: number;
  tanggal: string;
  jamAwal: string;
  jamAkhir: string;
  jenisKegiatan: string;
  status: 'approved' | 'pending' | 'rejected';
  Ruangan: Ruangan;
  User: User;
}

export const mockPeminjaman: ApiResponse<Peminjaman[]> = {
  code: 'cihuy',
  data: [
    {
      idPeminjaman: 5,
      User_idUser: 6,
      Ruangan_idRuangan: 1,
      tanggal: '2025-05-13T00:00:00.000Z',
      jamAwal: '1970-01-01T08:00:00.000Z',
      jamAkhir: '1970-01-01T10:00:00.000Z',
      jenisKegiatan: 'rapat',
      status: 'approved',
      Ruangan: {
        idRuangan: 1,
        namaRuangan: 'Ruang 101',
        kapasitas: 30,
      },
      User: {
        idUser: 6,
        namaUser: 'dosen A',
        email: 'dosen@gmail.com',
        noTelp: '084758234719',
        role: 'dosen',
        kartuTandaPengenal: null,
      },
    },
  ],
};

export async function getPeminjamanByRuanganId(
  _ruanganId: number,
  _tanggal: string
) {
  return mockPeminjaman;
}
