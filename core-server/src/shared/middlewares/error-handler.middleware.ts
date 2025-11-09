import type { Request, Response, NextFunction } from 'express';
import { Prisma } from '@/generated/prisma';
import { AppError, ErrorCode } from '@/shared/types/error';
import { sendError } from '@/shared/utils/response';

export const notFoundHandler = (_req: Request, res: Response) => {
  sendError(res, '요청한 경로를 찾을 수 없습니다', 404, ErrorCode.NOT_FOUND);
};

export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', error);

  if (error instanceof AppError) {
    sendError(res, error.message, error.statusCode, error.code);
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        sendError(res, '이미 존재하는 데이터입니다', 409, ErrorCode.DUPLICATE_RESOURCE);
        return;
      case 'P2025':
        sendError(res, '요청한 데이터를 찾을 수 없습니다', 404, ErrorCode.NOT_FOUND);
        return;
      default:
        sendError(res, '데이터베이스 오류가 발생했습니다', 500, ErrorCode.DATABASE_ERROR);
        return;
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    sendError(res, '잘못된 요청입니다', 400, ErrorCode.VALIDATION_ERROR);
    return;
  }

  sendError(res, '서버 오류가 발생했습니다', 500, ErrorCode.INTERNAL_SERVER_ERROR);
};
