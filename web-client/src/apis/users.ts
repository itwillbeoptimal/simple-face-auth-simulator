import { apiClient } from './client';
import type ApiResponse from '@/types/ApiResponse';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

export const getUserInfo = async (userId: string): Promise<UserInfo> => {
  const { data } = await apiClient.get<ApiResponse<UserInfo>>(`/api/users/${userId}`);
  return data.data;
};
