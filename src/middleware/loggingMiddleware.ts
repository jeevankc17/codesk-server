import { Request, Response, NextFunction } from 'express';

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Skip logging for Clerk handshake requests
  if (!req.url.includes('__clerk_handshake')) {
    console.log(`${req.method} ${req.url}`);
  }
  next();
}; 