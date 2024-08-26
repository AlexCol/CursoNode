import { Request, Response } from "express";
import flash from 'connect-flash';
import User from "../../models/User";
import bcrypt from 'bcryptjs';
import { setTimeout } from "timers";

export default class AuthController {
  static async login(req: Request, res: Response) {
    res.render('auth/login');
  }

  static async loginPost(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      //find user
      const user = await User.findOne({ where: { email: email } });
      if (!user) throw new Error("Usuário ou senha inválidos.");

      //check password
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) throw new Error("Usuário ou senha inválidos.");

      req.session.userid = user.id;
      req.flash('message', 'Autenticação realizada com sucesso!');
      req.session.save(() => {
        res.redirect('/');
      });

    } catch (e) {
      if (e instanceof Error) {
        req.flash('message', e.message);
        res.render('auth/login');
      }
    }
  }

  static async register(req: Request, res: Response) {
    res.render('auth/register');
  }

  static async registerPost(req: Request, res: Response) {
    const { name, email, password, confirmpassword } = req.body;

    //passwordMatch validation
    if (password != confirmpassword) {
      req.flash('message', 'As senhas não conferem, tente novamente!');
      res.render('auth/register');
      return;
    }

    //check if user exists
    const userExists = await User.findOne({ where: { email: email } });
    if (userExists) {
      req.flash('message', 'Email já cadastrado!');
      res.render('auth/register');
      return;
    }

    //create hashed password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
      const user = await User.create({ name, password: hashedPassword, email });
      req.flash('message', `Usuário cadastrado com sucesso!`);

      req.session.userid = user.id;
      req.session.save(() => {
        res.redirect('/');
      });
    } catch (err) {
      req.flash('message', `Erro: ${(err instanceof Error) ? err.message : err}`);
      res.render('auth/register');
    }
  }

  static async logout(req: Request, res: Response) {
    req.session.destroy(() => {
      res.redirect('/auth/login');
    });
  }
}