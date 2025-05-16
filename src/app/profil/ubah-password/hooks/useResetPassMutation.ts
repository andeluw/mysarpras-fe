'use client';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import api from '@/lib/api';

import useAuthStore from '@/stores/useAuthStore';

import { ApiError, ApiResponse } from '@/types/api';
import { User } from '@/types/user';

export default function useResetPassMutation() {
  const router = useRouter();
  const user = useAuthStore.useUser();
  const { mutate, isPending } = useMutation<
    ApiResponse<User>,
    AxiosError<ApiError>,
    { password: string }
  >({
    mutationFn: async ({ password }) => {
      const res = await api.patch<ApiResponse<User>>(`/user/update`, {
        password,
      });

      return res.data;
    },
    onSuccess: () => {
      toast.success('Password berhasil diperbarui');
      router.push(user?.role === 'admin' ? '/admin/profil' : '/profil');
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
