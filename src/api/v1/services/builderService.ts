import { ApiError } from '../utils/ApiError';
import { Prisma } from '@prisma/client';
import prisma from '../../../lib/prisma';

export class BuilderService {
  async createBuilder(data: Prisma.BuilderCreateInput) {
    try {
      // Check if builder profile already exists with this email
      const existingBuilder = await prisma.builder.findUnique({
        where: { email: data.email }
      });

      if (existingBuilder) {
        throw new ApiError(400, 'Builder profile already exists with this email');
      }

      // Create new builder profile
      const builder = await prisma.builder.create({
        data
      });

      return builder;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Error creating builder profile');
    }
  }
} 