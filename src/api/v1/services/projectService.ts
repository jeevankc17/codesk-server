import { PrismaClient } from '@prisma/client';

export class ProjectService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
} 