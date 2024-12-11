import { ApiError } from '../utils/ApiError';
import { Prisma } from '@prisma/client';
import prisma from '../../../lib/prisma';

export class BuilderService {
  async createBuilder(data: Prisma.BuilderCreateInput) {
    try {
      // Validate required fields
      if (!data.email || !data.userId) {
        throw new ApiError(400, 'Email and userId are required fields');
      }

      // Check if builder profile already exists with this userId
      const existingBuilder = await prisma.builder.findFirst({
        where: {
          OR: [
            { email: data.email },
            { userId: data.userId }
          ]
        }
      });

      if (existingBuilder) {
        throw new ApiError(400, 'Builder profile already exists for this user');
      }

      // Create new builder profile
      const builder = await prisma.builder.create({
        data
      });

      return builder;
      
    } catch (error) {
      // Handle Prisma-specific errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new ApiError(400, 'Unique constraint violation');
          case 'P2003':
            throw new ApiError(400, 'Foreign key constraint violation');
          default:
            console.error('Prisma Error:', error);
            throw new ApiError(500, 'Database error occurred');
        }
      }

      // If it's already an ApiError, rethrow it
      if (error instanceof ApiError) {
        throw error;
      }

      // Log unexpected errors
      console.error('Unexpected error in createBuilder:', error);
      throw new ApiError(500, 'Error creating builder profile');
    }
  }
} 