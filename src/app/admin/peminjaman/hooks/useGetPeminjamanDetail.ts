import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import api from '@/lib/api';

import { ApiError, ApiResponse } from '@/types/api';
import { Peminjaman } from '@/types/peminjaman';

export default function useGetPeminjamanDetail(id: string) {
  const {
    data: peminjamanDetail,
    isLoading,
    refetch: refetchDetail,
  } = useQuery<ApiResponse<Peminjaman>, AxiosError<ApiError>>({
    queryKey: ['peminjaman', 'detail', id],
    queryFn: async () => {
      const res = await api.get(`/peminjaman/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  return {
    peminjamanDetail,
    isLoading,
    refetchDetail,
  };
}
