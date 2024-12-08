import { Request, Response } from 'express';
import { BuilderService } from '../services/builderService';
import { ApiError } from '../utils/ApiError';

export class BuilderController {
  private builderService: BuilderService;

  constructor() {
    this.builderService = new BuilderService();
  }

  createBuilder = async (req: Request, res: Response) => {
    try {
      const builderData = req.body;
      
      // Validate required fields
      const requiredFields = [
        'name', 'email', 'phone', 'bio', 'gender', 'tShirtSize',
        'institution', 'degree', 'fieldOfStudy', 'graduationYear',
        'skills', 'experience', 'interests',
        'emergencyContactName', 'emergencyContactRelation', 'emergencyContactPhone'
      ];

      for (const field of requiredFields) {
        if (!builderData[field]) {
          throw new ApiError(400, `Missing required field: ${field}`);
        }
      }

      const builder = await this.builderService.createBuilder(builderData);
      res.status(201).json(builder);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error('Error creating builder:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
} 