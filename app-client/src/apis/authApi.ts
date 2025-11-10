import { apiClient } from '@/utils/apiClient';
import type { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse } from '@/types/Auth';

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('name', data.name);
  if (data.faceImage) {
    formData.append('face', data.faceImage as unknown as Blob);
  }
  const { data: response } = await apiClient.post<{ success: boolean; data: SignUpResponse }>(
    '/auth/signup',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return response.data;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const { data: response } = await apiClient.post<{ success: boolean; data: LoginResponse }>(
    '/auth/login',
    data,
  );
  return response.data;
};

export const logout = async (refreshToken: string): Promise<void> => {
  await apiClient.post('/auth/logout', { refreshToken });
};

export const validateFaceImage = async (photoFile: {
  uri: string;
  type: string;
  name: string;
}): Promise<{ success: boolean; message?: string }> => {
  const formData = new FormData();
  formData.append('file', photoFile as unknown as Blob);
  const { data } = await apiClient.post<{
    success: boolean;
    data: { success: boolean; message: string };
  }>('/face/extract-embedding', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
};
