import { BadRequestError, ErrorCode } from '@/shared/types/error';

export const validateRequired = (fields: Record<string, unknown>, fieldNames: string[]) => {
  const missing = fieldNames.filter(name => !fields[name]);
  if (missing.length > 0) {
    throw new BadRequestError(
      `필수 필드가 누락되었습니다: ${missing.join(', ')}`,
      ErrorCode.VALIDATION_ERROR,
    );
  }
};

export const validateEmail = (email: string) => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!EMAIL_REGEX.test(email)) {
    throw new BadRequestError('유효하지 않은 이메일 형식입니다', ErrorCode.INVALID_EMAIL);
  }
};

export const validateFile = (file: Express.Multer.File | undefined, message: string) => {
  if (!file) {
    throw new BadRequestError(message, ErrorCode.VALIDATION_ERROR);
  }
};
