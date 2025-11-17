import { apiClient } from './client';
import type ApiResponse from '@/types/ApiResponse';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserInfo {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthResponse {
  user: UserInfo;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await apiClient.post<ApiResponse<AuthResponse>>('/api/auth/login', {
    email,
    password,
  });
  return data.data;
};
