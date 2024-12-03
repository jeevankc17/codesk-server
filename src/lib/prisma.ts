import { PrismaClient } from '@prisma/client';

// Declare global type for TypeScript
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a global variable to hold the Prisma Client instance
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
