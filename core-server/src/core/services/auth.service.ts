import crypto from 'crypto';
import { tokenRepository } from '@/core/repositories/token.repository';
import { userRepository } from '@/core/repositories/user.repository';
import { config } from '@/infrastructure/config/env';
import { prisma } from '@/infrastructure/database/prisma';
import type { AuthResponse, RefreshTokenResponse, UserInfo } from '@/shared/types/dto/auth.dto';
import { ConflictError, UnauthorizedError, ErrorCode } from '@/shared/types/error';
import { hashPassword, comparePassword, generateToken } from '@/shared/utils/crypto';

const generateRefreshToken = () => crypto.randomBytes(64).toString('hex');

const getRefreshTokenExpiry = () =>
  new Date(Date.now() + config.refreshToken.expiryDays * 24 * 60 * 60 * 1000);

export const createUser = async (
  email: string,
  password: string,
  name: string,
  faceEmbedding?: number[],
): Promise<AuthResponse> => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new ConflictError('이미 사용 중인 이메일입니다', ErrorCode.DUPLICATE_EMAIL);
  }

  const hashedPassword = await hashPassword(password);

  const result = await prisma.$transaction(async tx => {
    const user = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    if (faceEmbedding && faceEmbedding.length > 0) {
      await tx.faceEmbedding.create({
        data: {
          userId: user.id,
          embedding: faceEmbedding,
        },
      });
    }

    const refreshToken = generateRefreshToken();
    await tx.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: getRefreshTokenExpiry(),
      },
    });

    const accessToken = generateToken(user.id);

    return { user, accessToken, refreshToken };
  });

  return result;
};

export const authenticateUser = async (email: string, password: string): Promise<AuthResponse> => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new UnauthorizedError(
      '이메일 또는 비밀번호가 올바르지 않습니다',
      ErrorCode.INVALID_CREDENTIALS,
    );
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw new UnauthorizedError(
      '이메일 또는 비밀번호가 올바르지 않습니다',
      ErrorCode.INVALID_CREDENTIALS,
    );
  }

  const accessToken = generateToken(user.id);
  const refreshToken = generateRefreshToken();

  await tokenRepository.create({
    userId: user.id,
    token: refreshToken,
    expiresAt: getRefreshTokenExpiry(),
  });

  const userInfo: UserInfo = {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };

  return {
    user: userInfo,
    accessToken,
    refreshToken,
  };
};

export const refreshAccessToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  const tokenRecord = await tokenRepository.findByToken(refreshToken);

  if (!tokenRecord) {
    throw new UnauthorizedError('유효하지 않은 리프레시 토큰입니다', ErrorCode.INVALID_TOKEN);
  }

  if (tokenRecord.expiresAt < new Date()) {
    await tokenRepository.delete(refreshToken);
    throw new UnauthorizedError('만료된 리프레시 토큰입니다', ErrorCode.TOKEN_EXPIRED);
  }

  const accessToken = generateToken(tokenRecord.userId);
  return { accessToken };
};

export const revokeRefreshToken = async (refreshToken: string): Promise<void> => {
  await tokenRepository.delete(refreshToken);
};

export const checkEmailAvailability = async (email: string): Promise<{ available: boolean }> => {
  const existingUser = await userRepository.findByEmail(email);
  return { available: !existingUser };
};
