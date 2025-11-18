import { faceEmbeddingRepository } from '@/core/repositories/face-embedding.repository';
import { userRepository } from '@/core/repositories/user.repository';
import type {
  FaceEmbeddingResponse,
  UserInfoResponse,
  VerifyPasswordResponse,
  ChangePasswordResponse,
} from '@/shared/types/dto/user.dto';
import { BadRequestError, ErrorCode, UnauthorizedError } from '@/shared/types/error';
import { comparePassword, hashPassword } from '@/shared/utils/crypto';

export const getAllFaceEmbeddings = async (): Promise<FaceEmbeddingResponse[]> => {
  const faceEmbeddings = await faceEmbeddingRepository.findAll();

  return faceEmbeddings.map(fe => ({
    id: fe.userId,
    face_embedding: fe.embedding,
  }));
};

export const getUserInfo = async (userId: string): Promise<UserInfoResponse | null> => {
  const user = await userRepository.findById(userId);
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const verifyUserPassword = async (
  userId: string,
  currentPassword: string,
): Promise<VerifyPasswordResponse> => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new BadRequestError('사용자를 찾을 수 없습니다', ErrorCode.INVALID_REQUEST);
  }

  const isValid = await comparePassword(currentPassword, user.password);
  return { valid: isValid };
};

export const updateUserPassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<ChangePasswordResponse> => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new BadRequestError('사용자를 찾을 수 없습니다', ErrorCode.INVALID_REQUEST);
  }

  const isValid = await comparePassword(currentPassword, user.password);
  if (!isValid) {
    throw new UnauthorizedError('현재 비밀번호가 올바르지 않습니다', ErrorCode.INVALID_CREDENTIALS);
  }

  const hashedPassword = await hashPassword(newPassword);
  await userRepository.updatePassword(userId, hashedPassword);

  return { success: true };
};
