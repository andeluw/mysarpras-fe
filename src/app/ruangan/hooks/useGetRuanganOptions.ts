import { useQuery } from '@tanstack/react-query';
import React from 'react';

import api from '@/lib/api';

import { ApiResponse } from '@/types/api';
import { Ruangan } from '@/types/ruangan';

export function useGetAllRuangan() {
  const { data: listRuanganData, isLoading: isLoadingRuangan } = useQuery<
    ApiResponse<Ruangan[]>
  >({
    queryKey: ['ruangan', 'list'],
    queryFn: async () => {
      const res = await api.get('/ruangan');
      return res.data;
    },
  });

  return {
    listRuanganData,
    isLoadingRuangan,
  };
}

export default function useGetRuanganOptions() {
  const { listRuanganData, isLoadingRuangan } = useGetAllRuangan();

  const listRuanganOptions = React.useMemo(() => {
    if (listRuanganData) {
      return listRuanganData.data.map((ruangan) => ({
        label: ruangan.namaRuangan,
        value: String(ruangan.idRuangan),
      }));
    }
    return [];
  }, [listRuanganData]);

  return {
    listRuanganOptions,
    isLoadingRuangan,
  };
}
