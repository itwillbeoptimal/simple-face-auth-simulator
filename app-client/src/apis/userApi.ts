import { apiClient } from '@/utils/apiClient';

export interface UserInfoResponse {
  id: string;
  name: string;
  email: string;
}

export interface VerifyPasswordRequest {
  currentPassword: string;
}

export interface VerifyPasswordResponse {
  valid: boolean;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
}

export const getUserInfo = async (userId: string): Promise<UserInfoResponse> => {
  const { data } = await apiClient.get<{ success: boolean; data: UserInfoResponse }>(
    `/users/${userId}`,
  );
  return data.data;
};

export const verifyPassword = async (
  data: VerifyPasswordRequest,
): Promise<VerifyPasswordResponse> => {
  const { data: response } = await apiClient.post<{
    success: boolean;
    data: VerifyPasswordResponse;
  }>('/users/verify-password', data);
  return response.data;
};

export const changePassword = async (
  data: ChangePasswordRequest,
): Promise<ChangePasswordResponse> => {
  const { data: response } = await apiClient.put<{
    success: boolean;
    data: ChangePasswordResponse;
  }>('/users/change-password', data);
  return response.data;
};
