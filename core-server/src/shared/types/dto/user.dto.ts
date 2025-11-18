export interface VerifyPasswordRequest {
  currentPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UserInfoResponse {
  id: string;
  name: string;
  email: string;
}

export interface FaceEmbeddingResponse {
  id: string;
  face_embedding: number[];
}

export interface VerifyPasswordResponse {
  valid: boolean;
}

export interface ChangePasswordResponse {
  success: boolean;
}
