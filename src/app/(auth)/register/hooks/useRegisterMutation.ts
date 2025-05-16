'use client';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import api from '@/lib/api';

import { RegisterRequest } from '@/app/(auth)/register/containers/RegisterPage';

import { ApiError, ApiResponse } from '@/types/api';

type RegisterResponse = {
  idUser: number;
  email: string;
  role: string;
};

export default function useRegisterMutation() {
  const router = useRouter();
  const { mutate: registerMutate, isPending } = useMutation<
    ApiResponse<RegisterResponse>,
    AxiosError<ApiError>,
    RegisterRequest
  >({
    mutationFn: async (data: RegisterRequest) => {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('role', data.role);
      formData.append('namaUser', data.namaUser);
      formData.append('noTelp', data.noTelp);
      formData.append('gambar', data.gambar[0]);

      const res = await api.post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    },
    onSuccess: () => {
      toast.success('Pendaftaran berhasil');
      router.push('/login');
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.error || 'Terjadi kesalahan, silahkan coba lagi'
      );
    },
  });

  return {
    registerMutate,
    isPending,
  };
}
