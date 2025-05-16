import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import api from '@/lib/api';

import { RoomRequestFormData } from '../component/RoomRequestForm';

import { ApiError, ApiResponse } from '@/types/api';

type PinjamMutationResponse = {
  idPeminjaman: number;
  User_idUser: number;
  Ruangan_idRuangan: number;
  tanggal: string;
  jamAwal: string;
  jamAkhir: string;
  jenisKegiatan: string;
  deskripsi: string;
  status: 'waiting' | 'accepted' | 'rejected' | 'canceled';
};

export default function usePinjamMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: pinjamMutation, isPending } = useMutation<
    ApiResponse<PinjamMutationResponse>,
    AxiosError<ApiError>,
    RoomRequestFormData
  >({
    mutationFn: async (data: RoomRequestFormData) => {
      const res = await api.post('/peminjaman/create', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['peminjaman', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['peminjaman', 'riwayat'] });
      toast.success('Peminjaman berhasil diajukan');
      router.push('/peminjaman/riwayat');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Gagal mengajukan peminjaman');
    },
  });

  return {
    pinjamMutation,
    isPending,
  };
}
