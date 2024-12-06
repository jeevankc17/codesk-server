import prisma from '../lib/prisma';

export class DatabaseHealthService {
  private static isReady: boolean = false;
  private static lastCheck: number = 0;
  private static CHECK_INTERVAL = 60000; // 1 minute

  static async checkHealth(): Promise<boolean> {
    const now = Date.now();
    
    // Only check if enough time has passed since last check
    if (this.isReady && now - this.lastCheck < this.CHECK_INTERVAL) {
      return this.isReady;
    }

    try {
      await prisma.$queryRaw`SELECT 1`;
      this.isReady = true;
    } catch (error) {
      this.isReady = false;
      console.error('Database health check failed:', error);
    }

    this.lastCheck = now;
    return this.isReady;
  }

  static getStatus(): boolean {
    return this.isReady;
  }
} 