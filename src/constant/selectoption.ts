export const timeSlotsOptions = Array.from({ length: 15 }, (_, i) => ({
  value: `${i + 7}`,
  label: `${i + 7}:00`,
}));

export const ruanganOptions = [
  { value: 'TeaterA', label: 'Teater A' },
  { value: 'TeaterB', label: 'Teater B' },
  { value: 'TeaterC', label: 'Teater C' },
  { value: 'SCC3', label: 'Aula SCC lantai 3' },
  { value: 'SCC1', label: 'SCC lantai 1' },
  { value: 'KPA', label: 'Selasar KPA' },
  { value: 'TW1Hall', label: 'Indoor Hall TW1' },
  { value: 'TW2Hall', label: 'Indoor Hall TW2' },
];

export const jenisKegiatanOptions = [
  { value: 'Kuliah', label: 'Kuliah' },
  { value: 'Ujian', label: 'Ujian / Evaluasi' },
  { value: 'Praktikum', label: 'Praktikum' },
  { value: 'Workshop', label: 'Workshop / Pelatihan' },
  { value: 'Maintenance', label: 'Maintenance / Perbaikan' },
  { value: 'Lomba', label: 'Lomba' },
  { value: 'Rapat', label: 'Rapat Organisasi' },
  { value: 'Forum', label: 'Forum Warga' },
  { value: 'UKM', label: 'Kegiatan Mahasiswa / UKM' },
  { value: 'Kegiatan Umum', label: 'Kegiatan Umum' },
  { value: 'Lainnya', label: 'Lainnya' },
];
