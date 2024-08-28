import { Request, Response } from "express";
import Tought from "../../models/Tought";

export default class TougthsController {
  static async showToughts(req: Request, res: Response) {
    res.render('toughts/home');
  }

  static async dashboard(req: Request, res: Response) {
    res.render('toughts/dashboard');
  }

  static async createTought(req: Request, res: Response) {
    res.render('toughts/create');
  }

  static async createToughtSave(req: Request, res: Response) {
    const { title } = req.body;
    const userId = req.session.userid;

    const tought = new Tought({
      title,
      userId: userId!
    });

    try {
      await tought.save();

      req.flash('message', 'Pensamento criado com sucesso!');
      req.session.save(() =>
        res.redirect('/tought/dashboard')
      );
    } catch (e) {
      req.flash('message', `Erro: ${e}`);
    }
  };
}