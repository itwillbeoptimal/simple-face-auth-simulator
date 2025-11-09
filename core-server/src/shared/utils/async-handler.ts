import type { Request, Response, NextFunction } from 'express';

export const asyncHandler = <ReqBody = unknown, ResBody = unknown>(
  handler: (
    req: Request<unknown, ResBody, ReqBody>,
    res: Response<ResBody>,
    next: NextFunction,
  ) => Promise<void>,
) => {
  return (req: Request<unknown, ResBody, ReqBody>, res: Response<ResBody>, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};
