import { Request, Response } from "express";

export class TaskController {
  static createTask(req: Request, res: Response) {
    res.render('tasks/create');
  }
}