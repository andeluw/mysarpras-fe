import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import api from '@/lib/api';

import { TambahRuanganRequest } from '@/app/admin/ruangan/tambah/containers/TambahRuanganForm';

import { ApiError, ApiResponse } from '@/types/api';
import { Ruangan } from '@/types/ruangan';

export default function useTambahRuanganMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: tambahRuanganMutation, isPending } = useMutation<
    ApiResponse<Ruangan>,
    AxiosError<ApiError>,
    TambahRuanganRequest
  >({
    mutationFn: async (data: TambahRuanganRequest) => {
      const fasilitasString = Array.isArray(data.fasilitas)
        ? data.fasilitas.map((item) => item.value || item).join(', ')
        : '';
      const formData = new FormData();
      formData.append('namaRuangan', data.namaRuangan);
      formData.append('kapasitas', String(data.kapasitas));
      formData.append('gambar', data.gambar[0]);
      formData.append('deskripsi', data.deskripsi);
      formData.append('fasilitas', fasilitasString);
      formData.append('Gedung', data.Gedung);
      const res = await api.post('/ruangan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ruangan', 'list'] });
      toast.success('Ruangan berhasil ditambahkan');
      router.push('/admin/ruangan');
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.error || 'Terjadi kesalahan, silahkan coba lagi'
      );
    },
  });

  return {
    tambahRuanganMutation,
    isPending,
  };
}
