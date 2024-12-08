import { Request, Response, NextFunction } from 'express';
import { OrganizerService } from '../services/organizerService';

export class OrganizerController {
  private organizerService: OrganizerService;

  constructor() {
    this.organizerService = new OrganizerService();
  }
} 