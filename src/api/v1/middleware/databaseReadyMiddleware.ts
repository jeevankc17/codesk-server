import { Request, Response, NextFunction } from 'express';
import { DatabaseHealthService } from '../../../services/databaseHealthService';
import { APIResponse } from '../../../types';

export const checkDatabaseReady = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (DatabaseHealthService.getStatus()) {
    next();
    return;
  }

  // Only check database if status is false
  const isReady = await DatabaseHealthService.checkHealth();
  if (isReady) {
    next();
    return;
  }

  const response: APIResponse = {
    success: false,
    error: 'Service temporarily unavailable',
    timestamp: new Date().toISOString(),
  };

  res.status(503).json(response);
}; 