import { Request, Response } from 'express';
import prisma from '../../../lib/prisma';
import { APIResponse } from '../../../types';

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    const response: APIResponse = {
      success: true,
      data: user,
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