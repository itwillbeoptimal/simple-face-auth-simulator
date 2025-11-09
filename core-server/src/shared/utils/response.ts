import type { Response } from 'express';
import type { ApiResponse } from '@/shared/types/response';

export const sendSuccess = <T>(res: Response, data: T, message?: string, statusCode = 200) => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    ...(message && { message }),
  };
  res.status(statusCode).json(response);
};

export const sendError = (res: Response, message: string, statusCode = 400, code?: string) => {
  const response: ApiResponse = {
    success: false,
    error: {
      code: code || 'UNKNOWN_ERROR',
      message,
    },
  };
  res.status(statusCode).json(response);
};
