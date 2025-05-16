import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import api from '@/lib/api';

import { EditRuanganRequest } from '@/app/admin/ruangan/edit/[id]/containers/EditRuanganForm';
import { TambahRuanganRequest } from '@/app/admin/ruangan/tambah/containers/TambahRuanganForm';

import { ApiError, ApiResponse } from '@/types/api';
import { Ruangan } from '@/types/ruangan';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function useEditRuanganMutation({
  idRuangan,
}: {
  idRuangan: number;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: editRuanganMutation, isPending } = useMutation<
    ApiResponse<Ruangan>,
    AxiosError<ApiError>,
    TambahRuanganRequest
  >({
    mutationFn: async (data: EditRuanganRequest) => {
      const fasilitasString = Array.isArray(data.fasilitas)
        ? (data.fasilitas as any[]).map((item) => item.value || item).join(', ')
        : String(data.fasilitas || '');
      const formData = new FormData();
      formData.append('namaRuangan', data.namaRuangan);
      formData.append('kapasitas', String(data.kapasitas));
      formData.append('gambar', data.gambar[0]);
      formData.append('deskripsi', data.deskripsi);
      formData.append('fasilitas', fasilitasString);
      formData.append('Gedung', data.Gedung);
      const res = await api.patch(`/ruangan/${idRuangan}`, formData, {
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
    editRuanganMutation,
    isPending,
  };
}
