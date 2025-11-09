import {
  createUser,
  authenticateUser,
  refreshAccessToken,
  revokeRefreshToken,
  checkEmailAvailability,
} from '@/core/services/auth.service';
import { extractFaceEmbedding } from '@/infrastructure/external/ai-client';
import type { SignupRequest, LoginRequest, RefreshTokenRequest } from '@/shared/types/dto/auth.dto';
import { asyncHandler } from '@/shared/utils/async-handler';
import { sendSuccess } from '@/shared/utils/response';
import { validateRequired, validateEmail, validatePassword } from '@/shared/utils/validators';

export const signup = asyncHandler<SignupRequest>(async (req, res) => {
  const { email, password, name } = req.body;
  const faceImage = req.file;

  validateRequired({ email, password, name }, ['email', 'password', 'name']);
  validateEmail(email);
  validatePassword(password);

  let faceEmbedding: number[] | undefined;
  if (faceImage) {
    faceEmbedding = await extractFaceEmbedding(faceImage.buffer);
  }

  const result = await createUser(email, password, name, faceEmbedding);

  sendSuccess(res, result, '회원가입이 완료되었습니다', 201);
});

export const login = asyncHandler<LoginRequest>(async (req, res) => {
  const { email, password } = req.body;

  validateRequired({ email, password }, ['email', 'password']);

  const result = await authenticateUser(email, password);
  sendSuccess(res, result);
});

export const refresh = asyncHandler<RefreshTokenRequest>(async (req, res) => {
  const { refreshToken } = req.body;

  validateRequired({ refreshToken }, ['refreshToken']);

  const result = await refreshAccessToken(refreshToken);
  sendSuccess(res, result);
});

export const logout = asyncHandler<RefreshTokenRequest>(async (req, res) => {
  const { refreshToken } = req.body;

  validateRequired({ refreshToken }, ['refreshToken']);

  await revokeRefreshToken(refreshToken);
  sendSuccess(res, null, '로그아웃되었습니다');
});

export const checkEmail = asyncHandler(async (req, res) => {
  const { email } = req.query;

  validateRequired({ email }, ['email']);
  validateEmail(email as string);

  const result = await checkEmailAvailability(email as string);
  sendSuccess(res, result);
});
