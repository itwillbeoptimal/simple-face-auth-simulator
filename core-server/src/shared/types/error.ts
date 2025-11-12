export enum ErrorCode {
  INVALID_REQUEST = 'INVALID_REQUEST',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',

  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',

  DUPLICATE_EMAIL = 'DUPLICATE_EMAIL',
  DUPLICATE_RESOURCE = 'DUPLICATE_RESOURCE',

  FACE_EXTRACTION_FAILED = 'FACE_EXTRACTION_FAILED',
  AI_SERVER_ERROR = 'AI_SERVER_ERROR',

  DATABASE_ERROR = 'DATABASE_ERROR',
}

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, code: ErrorCode = ErrorCode.VALIDATION_ERROR) {
    super(message, 400, code);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = '인증이 필요합니다', code: ErrorCode = ErrorCode.UNAUTHORIZED) {
    super(message, 401, code);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = '접근 권한이 없습니다', code: ErrorCode = ErrorCode.FORBIDDEN) {
    super(message, 403, code);
  }
}

export class NotFoundError extends AppError {
  constructor(
    message: string = '요청한 리소스를 찾을 수 없습니다',
    code: ErrorCode = ErrorCode.NOT_FOUND,
  ) {
    super(message, 404, code);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, code: ErrorCode = ErrorCode.CONFLICT) {
    super(message, 409, code);
  }
}
