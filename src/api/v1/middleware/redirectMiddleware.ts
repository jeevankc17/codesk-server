import { Request, Response, NextFunction } from 'express';

export const redirectToDashboard = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user;
  const path = req.path;

  // If accessing any dashboard route
  if (path.includes('/dashboard')) {
    if (user?.role === 'admin') {
      res.redirect('/api/v1/admin/dashboard');
      return;
    } else {
      res.redirect('/api/v1/dashboard');
      return;
    }
  }
  next();
}; 