import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '@/store';
import { logoutAtom } from '@/atoms/authAtom';
import { HOST_IP, CORE_SERVER_PORT } from '@env';

const API_BASE_URL = `https://${HOST_IP}:${CORE_SERVER_PORT}/api`;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface QueueItem {
  resolve: (value: string | null) => void;
  reject: (reason: Error) => void;
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: Error | null = null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async (error: AxiosError<{ success: boolean; error?: { code: string; message: string } }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const errorCode = error.response?.data?.error?.code;

    if (
      error.response?.status === 401 &&
      errorCode === 'TOKEN_EXPIRED' &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        if (!refreshToken) {
          throw new Error('리프레시 토큰이 존재하지 않습니다.');
        }

        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          { refreshToken },
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );

        const { accessToken } = response.data.data;

        await AsyncStorage.setItem('accessToken', accessToken);

        processQueue(null, accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        const error =
          refreshError instanceof Error
            ? refreshError
            : new Error('알 수 없는 에러가 발생했습니다.');
        processQueue(error, null);

        await store.set(logoutAtom);

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
