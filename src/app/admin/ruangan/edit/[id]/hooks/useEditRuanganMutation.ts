import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import api from '@/lib/api';

import { EditRuanganRequest } from '@/app/admin/ruangan/edit/[id]/containers/EditRuanganForm';

import { ApiError, ApiResponse } from '@/types/api';
import { Ruangan } from '@/types/ruangan';

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
    EditRuanganRequest
  >({
    mutationFn: async (data: EditRuanganRequest) => {
      const fasilitasString = Array.isArray(data.fasilitas)
        ? data.fasilitas.map((item) => item).join(', ')
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
      toast.success('Ruangan berhasil diperbarui');
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
