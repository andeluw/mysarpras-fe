'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import api from '@/lib/api';

import { ApiError, ApiResponse } from '@/types/api';

export default function useUpdateStatusMutation({ id }: { id: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation<
    ApiResponse<{ idPeminjaman: number }>,
    AxiosError<ApiError>,
    {
      status: 'approved' | 'rejected' | 'canceled';
    }
  >({
    mutationFn: async ({ status }) => {
      const response = await api.patch<ApiResponse<{ idPeminjaman: number }>>(
        `/peminjaman/updateStatus/${id}`,
        { status }
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      if (variables.status === 'approved') {
        toast.success('Peminjaman berhasil disetujui');
      }
      if (variables.status === 'rejected') {
        toast.success('Peminjaman berhasil ditolak');
      }
      if (variables.status === 'canceled') {
        toast.success('Peminjaman berhasil dibatalkan');
      }
      queryClient.refetchQueries({
        queryKey: ['peminjaman', 'detail', id],
      });
      queryClient.invalidateQueries({
        queryKey: ['peminjaman'],
        exact: false,
      });
      if (variables.status === 'approved' || variables.status === 'rejected') {
        router.push(`/admin/peminjaman/ajuan`);
      } else {
        router.push(`/admin/peminjaman/riwayat`);
      }
    },
    onError: (error) => {
      toast.error(
        error.response?.data.error || 'Terjadi kesalahan. Silakan coba lagi'
      );
    },
  });
  return {
    mutate,
    isPending,
  };
}
