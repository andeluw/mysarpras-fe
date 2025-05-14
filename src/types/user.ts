export type User = {
  idUser: number;
  namaUser: string;
  email?: string;
  noTelp?: string | null;
  role: 'admin' | 'mahasiswa' | 'dosen';
  kartuTandaPengenal: string | null;
};
