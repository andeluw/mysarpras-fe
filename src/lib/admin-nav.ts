export const adminNav = {
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      items: [
        {
          title: 'Dashboard',
          url: '/admin',
          exactMatch: true,
        },
        {
          title: 'Statistik Analitik',
          url: '/admin/statistik',
        },
      ],
    },
    {
      title: 'Peminjaman',
      url: '#',
      items: [
        {
          title: 'Ajuan Peminjaman',
          url: '/admin/peminjaman/ajuan',
        },
        {
          title: 'Riwayat Peminjaman',
          url: '/admin/peminjaman/riwayat',
        },
        {
          title: 'Buat Peminjaman',
          url: '/admin/peminjaman/buat',
        },
      ],
    },
    {
      title: 'Ruangan',
      url: '#',
      items: [
        {
          title: 'Jadwal Ketersediaan',
          url: '/admin/ruangan/jadwal-ketersediaan',
        },
        {
          title: 'Daftar Ruangan',
          url: '/admin/ruangan/daftar-ruangan',
        },
        {
          title: 'Tambah Ruangan',
          url: '/admin/ruangan/tambah',
        },
      ],
    },
  ],
};
