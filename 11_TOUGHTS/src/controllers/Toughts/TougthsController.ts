import { Request, Response } from "express";
import Tought from "../../models/Tought";

export default class TougthsController {
  static async showToughts(req: Request, res: Response) {
    res.render('toughts/home');
  }

  static async dashboard(req: Request, res: Response) {
    const userId = req.session.userid;
    if (!userId) {
      res.redirect('/login');
      return;
    }

    const toughts = await Tought.findAll({
      where: { userId: userId },
      raw: true
    });

    var emptyToughts = toughts.length == 0;

    res.render('toughts/dashboard', { toughts, emptyToughts });
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
        res.redirect('/toughts/dashboard')
      );
    } catch (e) {
      req.flash('message', `Erro: ${e}`);
    }
  };

  static async removeTought(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const userId = req.session.userid;

      // const tought = await Tought.findOne({ where: { id: id, userId: userId } });
      // if (!tought) {
      //   req.flash('message', 'Pensamento não encontrado ou não percente ao usuário logado!');
      //   res.redirect('/toughts/dashboard')
      //   return;
      // }
      // await tought.destroy();

      const deletados = await Tought.destroy({ where: { id: id, userId: userId } });
      if (deletados > 0) {
        req.flash('message', 'Pensamento excluído com sucesso!');
      }
      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (e) {
      req.flash('message', `Erro: ${e}`);
    }
  }
}