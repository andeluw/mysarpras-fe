import { QueryFunction } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { UninterceptedApiError } from '@/types/api';

/** Add NEXT_PUBLIC_MOCK_DEPLOYMENT_URL to your production deployment on vercel! */
const baseURL =
  process.env.NEXT_PUBLIC_MOCK_DEPLOYMENT_URL &&
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_MOCK_DEPLOYMENT_URL}/api/mock`
    : process.env.NEXT_PUBLIC_MOCK_DEPLOYMENT_URL &&
      process.env.NODE_ENV !== 'production'
    ? `http://${process.env.NEXT_PUBLIC_MOCK_DEPLOYMENT_URL}/api/mock`
    : process.env.NEXT_PUBLIC_API_URL
    ? `https://${process.env.NEXT_PUBLIC_API_URL}/api/mock`
    : 'http://localhost:3000/api/mock';

export const apiMock = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

apiMock.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }
  return config;
});

apiMock.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError<UninterceptedApiError>) => {
    // parse error
    if (error.response?.data.error) {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message:
              typeof error.response.data.error === 'string'
                ? error.response.data.error
                : Object.values(error.response.data.error)[0][0],
          },
        },
      });
    }
    return Promise.reject(error);
  }
);

export default apiMock;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockQuery: QueryFunction<any> = async ({ queryKey }) => {
  const [url] = queryKey;

  const { data } = await apiMock.get(url as string);
  return data;
};
