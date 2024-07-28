import { Request, Response } from "express";
import Task from "../models/Tasks";
import { FindOptions, InferAttributes, where } from "sequelize";

const defaultOptions: FindOptions<InferAttributes<Task, { omit: never; }>> = {
  raw: true
};

export class TaskController {
  //! views
  static viewCreateTask(req: Request, res: Response) {
    res.render('tasks/create');
  }

  static async viewShowTasks(req: Request, res: Response) {
    const tasks = await Task.findAll(defaultOptions);
    res.render('tasks/all', { tasks, emptyTasks: tasks.length === 0 });
  }

  static async viewUpdateTask(req: Request, res: Response) {
    const { id } = req.params;
    //const task = await Task.findByPk(id, { ...defaultOptions });
    const task = await Task.findOne({ ...defaultOptions, where: { id: id } });
    res.render('tasks/edit', { task });
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

  static async updateTask(req: Request, res: Response) {
    //?aulta 09 tem outra forma de fazer (usado esse metodo no updateTaskDone - apesar da complexidade para tratar o done)
    const task: Task = req.body; //!!com isso mapeia tudo que é de task vindo do body

    const currentTask = await Task.findByPk(task.id); //busca task atual com base no id informado
    if (!currentTask) {
      res.render('tasks/all', { error: 'Task não encontrada!' });
      return;
    }
    currentTask.set(task); //atualiza task atual com dados vindos do body
    currentTask.save(); //salva
    res.redirect('/tasks');
  }

  static async updateTaskDone(req: Request, res: Response) {
    const task: Task = req.body; //!!com isso mapeia tudo que é de task vindo do body

    if (typeof task.done === 'string') //! por causa do mysql salvar como 0 ou 1, ao receber do body o 'done' é forçado a virar string
      await Task.update({ done: task.done === '0' }, { where: { id: task.id } });
    else //! senão for, assumo que seja boolean mesmo (no do projeto - mysql - aqui nunca vai entrar)
      await Task.update({ done: !task.done }, { where: { id: task.id } });

    res.redirect('/tasks');
  }

  static async deleteTask(req: Request, res: Response) {
    const { id } = req.body;
    await Task.destroy({ where: { id: id } });
    res.redirect('/tasks');
  }
}

