import type { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, ErrorCode } from '@/shared/types/error';
import { verifyToken } from '@/shared/utils/crypto';

export interface AuthRequest extends Request {
  userId: string;
}

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedError('인증 토큰이 필요합니다', ErrorCode.UNAUTHORIZED);
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);

    (req as AuthRequest).userId = decoded.userId;
    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return next(error);
    }

    if (error instanceof Error) {
      switch (error.name) {
        case 'TokenExpiredError':
          return next(new UnauthorizedError('토큰이 만료되었습니다', ErrorCode.TOKEN_EXPIRED));
        case 'JsonWebTokenError':
          return next(new UnauthorizedError('유효하지 않은 토큰입니다', ErrorCode.INVALID_TOKEN));
      }
    }

    next(new UnauthorizedError('인증에 실패했습니다', ErrorCode.UNAUTHORIZED));
  }
};
