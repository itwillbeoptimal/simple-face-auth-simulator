import { apiClient } from '@/utils/apiClient';
import type {
  VerifyPasswordRequest,
  VerifyPasswordResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  UserInfo,
} from '@/types/User';

export const verifyPassword = async (
  data: VerifyPasswordRequest,
): Promise<VerifyPasswordResponse> => {
  const response = await apiClient.post<{ data: VerifyPasswordResponse }>(
    '/users/verify-password',
    data,
  );
  return response.data.data;
};

export const changePassword = async (
  data: ChangePasswordRequest,
): Promise<ChangePasswordResponse> => {
  const response = await apiClient.patch<{ data: ChangePasswordResponse }>(
    '/users/password',
    data,
  );
  return response.data.data;
};

export const getUserInfo = async (userId: string): Promise<UserInfo> => {
  const response = await apiClient.get<{ data: UserInfo }>(`/users/${userId}`);
  return response.data.data;
};
