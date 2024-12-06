import { Request, Response, NextFunction } from 'express';
import { APIResponse } from '../../../types';

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = req.user;

  if (!user || user.role !== 'admin') {
    const response: APIResponse = {
      success: false,
      error: 'Access denied. Admin role required.',
      timestamp: new Date().toISOString(),
    };
    res.status(403).json(response);
    return;
  }

  next();
};

export const isUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = req.user;

  if (!user) {
    const response: APIResponse = {
      success: false,
      error: 'Access denied. Authentication required.',
      timestamp: new Date().toISOString(),
    };
    res.status(401).json(response);
    return;
  }

  next();
}; 