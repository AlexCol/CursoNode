import { Request, Response } from "express";
import Task from "../models/Tasks";

export class TaskController {
  //! views
  static viewCreateTask(req: Request, res: Response) {
    res.render('tasks/create');
  }

  static async viewShowTasks(req: Request, res: Response) {
    const tasks = await Task.findAll({ raw: true });
    res.render('tasks/all', { tasks, emptyTasks: tasks.length === 0 });
  }

  //! back end operations
  static async createTask(req: Request, res: Response) {
    const task = new Task({ //!outro exemplo, sem tipagem, no modulo 6
      title: req.body.title,
      description: req.body.description,
      done: false
    });
    await task.save();

    res.redirect('/tasks');
  }

  static async deleteTask(req: Request, res: Response) {
    const { id } = req.body;
    await Task.destroy({ where: { id: id } });
    res.redirect('/tasks');
  }
}

