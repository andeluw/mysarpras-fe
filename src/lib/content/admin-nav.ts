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
          title: 'Profil Saya',
          url: '/admin/profil',
          exactMatch: true,
        },
        {
          title: 'Ubah Password',
          url: '/admin/profil/ubah-password',
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
          url: '/admin/peminjaman/form',
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
          url: '/admin/ruangan',
          exactMatch: true,
        },
        {
          title: 'Tambah Ruangan',
          url: '/admin/ruangan/tambah',
        },
      ],
    },
  ],
};
