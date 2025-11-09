import type { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '@/shared/types/error';
import { verifyToken } from '@/shared/utils/crypto';

export interface AuthRequest extends Request {
  userId: string;
}

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedError('인증 토큰이 필요합니다');
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);

    (req as AuthRequest).userId = decoded.userId;
    next();
  } catch (error) {
    next(
      error instanceof UnauthorizedError
        ? error
        : new UnauthorizedError('유효하지 않은 토큰입니다'),
    );
  }
};
