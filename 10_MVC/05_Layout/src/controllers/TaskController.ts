import { Request, Response } from "express";

export class TaskController {
  static createTask(req: Request, res: Response) {
    res.render('tasks/create');
  }

  static showTasks(req: Request, res: Response) {
    res.render('tasks/all');
  }
}