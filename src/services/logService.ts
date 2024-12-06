import prisma from '../lib/prisma';

type LogLevel = 'info' | 'error' | 'warn' | 'debug';
type LogType = 'webhook' | 'auth' | 'error' | 'system';

export class LogService {
  static async log(
    type: LogType,
    level: LogLevel,
    message: string,
    metadata?: any
  ) {
    try {
      // Log to console with emojis based on type/level
      const emoji = this.getEmoji(type, level);
      console[level](`${emoji} ${message}`, metadata);

      // Store in database
      await prisma.log.create({
        data: {
          type,
          level,
          message,
          metadata: metadata || {},
        },
      });
    } catch (error) {
      console.error('Logging error:', error);
    }
  }

  private static getEmoji(type: LogType, level: LogLevel): string {
    if (level === 'error') return '❌';
    
    switch (type) {
      case 'webhook': return '🔄';
      case 'auth': return '🔐';
      case 'system': return '⚙️';
      default: return '📝';
    }
  }

  static async getRecentLogs(
    limit: number = 100,
    type?: LogType,
    level?: LogLevel
  ) {
    return prisma.log.findMany({
      where: {
        ...(type && { type }),
        ...(level && { level }),
      },
      orderBy: {
        timestamp: 'desc',
      },
      take: limit,
    });
  }
} 