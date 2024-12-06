import { Request, Response } from 'express';
import { APIResponse } from '../../../types';

export const getAdminDashboard = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const response: APIResponse = {
      success: true,
      message: 'Admin Dashboard',
      data: {
        user
      },
      timestamp: new Date().toISOString(),
    };
    res.status(200).json(response);
  } catch (error) {
    const response: APIResponse = {
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
    };
    res.status(500).json(response);
  }
};

export const getUserDashboard = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const response: APIResponse = {
      success: true,
      message: 'User Dashboard',
      data: {
        user
      },
      timestamp: new Date().toISOString(),
    };
    res.status(200).json(response);
  } catch (error) {
    const response: APIResponse = {
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
    };
    res.status(500).json(response);
  }
}; 