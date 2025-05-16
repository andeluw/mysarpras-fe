'use client';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import api from '@/lib/api';
import { getToken } from '@/lib/cookies';

import useAuthStore from '@/stores/useAuthStore';

import { ApiError, ApiResponse } from '@/types/api';
import { User } from '@/types/user';

export default function useUpdateProfileMutation() {
  const login = useAuthStore.useLogin();
  const user = useAuthStore.useUser();
  const ktp = user?.kartuTandaPengenal;
  const { mutate, isPending } = useMutation<
    ApiResponse<User>,
    AxiosError<ApiError>,
    Partial<User>
  >({
    mutationFn: async (formData: Partial<User>) => {
      const res = await api.patch<ApiResponse<User>>(`/user/update`, formData);
      const user = res.data.data;

      if (user) {
        const token = await getToken();
        if (token) {
          await login({ ...user, token, kartuTandaPengenal: ktp as string });
        }
      }

      return res.data;
    },
    onSuccess: () => {
      toast.success('Profil berhasil diperbarui');
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
