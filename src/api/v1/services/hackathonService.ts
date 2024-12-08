import { PrismaClient } from '@prisma/client';

export class HackathonService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
} 