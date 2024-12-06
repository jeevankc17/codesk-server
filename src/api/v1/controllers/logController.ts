import { Request, Response } from 'express';
import { LogService } from '../../../services/logService';

// Import or define the types
type LogType = 'webhook' | 'auth' | 'error' | 'system';
type LogLevel = 'info' | 'error' | 'warn' | 'debug';

export const getLogs = async (req: Request, res: Response) => {
  try {
    const { limit = 100, type, level } = req.query;
    
    // Validate type and level
    const validType = type as string && ['webhook', 'auth', 'error', 'system'].includes(type as string) ? type as LogType : undefined;
    const validLevel = level as string && ['info', 'error', 'warn', 'debug'].includes(level as string) ? level as LogLevel : undefined;

    const logs = await LogService.getRecentLogs(
      Number(limit),
      validType,
      validLevel
    );

    res.status(200).json({
      success: true,
      data: logs,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    await LogService.log('system', 'error', 'Error fetching logs', {
      error: error instanceof Error ? error.message : error
    });
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch logs',
      timestamp: new Date().toISOString(),
    });
  }
}; 