import { Request, Response } from "express";
import flash from 'connect-flash';
import User from "../../models/User";
import bcrypt from 'bcryptjs';
import { setTimeout } from "timers";

export default class AuthController {
  static async login(req: Request, res: Response) {
    res.render('auth/login');
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

    const user = {
      name, email, password: hashedPassword
    }

    try {
      await User.create(user);
      req.flash('message', `Usuário cadastrado com sucesso!`);
      res.redirect('/');
    } catch (err) {
      req.flash('message', `Erro: ${(err instanceof Error) ? err.message : err}`);
      res.render('auth/register');
    }
  }
}