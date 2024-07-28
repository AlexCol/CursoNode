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
    //! sem uma tipagem para task
    // const task = {
    //   title: req.body.title,
    //   description: req.body.description,
    //   done: false
    // };
    // await Task.create(task);

    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      done: false
    });
    await task.save();

    res.redirect('/tasks');
  }

}

