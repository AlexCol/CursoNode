import { Request, Response } from "express";

export default class TougthsController {
  static async showToughts(req: Request, res: Response) {
    res.render('toughts/home');
  }
}