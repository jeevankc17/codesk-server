import { Request, Response } from 'express';
import { BuilderService } from '../services/builderService';
import { ApiError } from '../utils/ApiError';

const builderService = new BuilderService();

export const builderController = {
  createBuilder: async (req: Request, res: Response) => {
    try {
      const builderData = req.body;
      const userId = req.auth?.userId;

      console.log('Creating builder with data:', {
        ...builderData,
        userId,
      });
      
      const builder = await builderService.createBuilder({
        ...builderData,
        userId
      });

      res.status(201).json({
        status: 'success',
        data: builder
      });

    } catch (error) {
      console.error('Error in builderController:', {
        error,
        requestBody: req.body,
        userId: req.auth?.userId
      });

      const apiError = error instanceof ApiError 
        ? error 
        : new ApiError(500, 'Failed to create builder');

      res.status(apiError.statusCode).json({
        status: 'error',
        message: apiError.message
      });
    }
  }
}; 