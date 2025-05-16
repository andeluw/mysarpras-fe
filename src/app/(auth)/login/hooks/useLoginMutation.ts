import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import api from '@/lib/api';
import { setToken } from '@/lib/cookies';

import useAuthStore from '@/stores/useAuthStore';

import { LoginRequest } from '@/app/(auth)/login/containers/LoginPage';

import { ApiError, ApiResponse } from '@/types/api';
import { User, WithToken } from '@/types/user';

export const useLoginMutation = () => {
  const login = useAuthStore.useLogin();
  const { mutate: loginMutate, isPending } = useMutation<
    ApiResponse<WithToken>,
    AxiosError<ApiError>,
    LoginRequest
  >({
    mutationFn: async (data: LoginRequest) => {
      const res = await api.post<ApiResponse<WithToken>>('/auth/login', data);
      const { token } = res.data.data;
      setToken(token);

      const user = await api.get<ApiResponse<User>>('/user/profile');
      if (user) {
        login({ ...user.data.data, token: token });
      }
      return res.data;
    },
    onSuccess: () => {
      toast.success('Anda berhasil login');
    },
    onError: (error) => {
      toast.error(
        error.response?.data.error ||
          'Email atau kata sandi salah, silahkan coba lagi'
      );
    },
  });

  return { loginMutate, isPending };
};
