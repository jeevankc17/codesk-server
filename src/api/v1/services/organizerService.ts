import { PrismaClient } from '@prisma/client';

export class OrganizerService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
} 