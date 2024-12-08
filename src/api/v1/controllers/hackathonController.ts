import { Request, Response, NextFunction } from 'express';
import { HackathonService } from '../services/hackathonService';

export class HackathonController {
  private hackathonService: HackathonService;

  constructor() {
    this.hackathonService = new HackathonService();
  }
} 