import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '../services/projectService';

export class ProjectController {
  private projectService;

  constructor() {
    this.projectService = new ProjectService();
  }
} 