import {
  getAllFaceEmbeddings,
  getUserInfo,
  verifyUserPassword,
  updateUserPassword,
} from '@/core/services/user.service';
import type { AuthRequest } from '@/shared/middlewares/auth.middleware';
import type {
  VerifyPasswordRequest,
  ChangePasswordRequest,
} from '@/shared/types/dto/user.dto';
import { BadRequestError, ErrorCode } from '@/shared/types/error';
import { asyncHandler } from '@/shared/utils/async-handler';
import { sendSuccess } from '@/shared/utils/response';
import { validateRequired, validatePassword } from '@/shared/utils/validators';

export const getFaceEmbeddings = asyncHandler(async (_req, res) => {
  const result = await getAllFaceEmbeddings();
  sendSuccess(res, result);
});

export const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.params as { userId: string };
  const result = await getUserInfo(userId);

  if (!result) {
    throw new BadRequestError('사용자를 찾을 수 없습니다', ErrorCode.INVALID_REQUEST);
  }

  sendSuccess(res, result);
});

export const verifyPassword = asyncHandler<VerifyPasswordRequest>(async (req, res) => {
  const { userId } = req as AuthRequest;
  const { currentPassword } = req.body;

  if (!currentPassword) {
    throw new BadRequestError('현재 비밀번호를 입력해주세요', ErrorCode.INVALID_REQUEST);
  }

  const result = await verifyUserPassword(userId, currentPassword);
  sendSuccess(res, result);
});

export const changePassword = asyncHandler<ChangePasswordRequest>(async (req, res) => {
  const { userId } = req as AuthRequest;
  const { currentPassword, newPassword } = req.body;

  validateRequired({ currentPassword, newPassword }, ['currentPassword', 'newPassword']);
  validatePassword(newPassword);

  const result = await updateUserPassword(userId, currentPassword, newPassword);
  sendSuccess(res, result);
});
