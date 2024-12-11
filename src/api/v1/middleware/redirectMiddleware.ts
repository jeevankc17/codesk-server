import { Request, Response, NextFunction } from 'express';

export const redirectMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next();
}; 