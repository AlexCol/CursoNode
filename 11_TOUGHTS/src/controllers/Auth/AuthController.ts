import { Request, Response } from "express";
import flash from 'connect-flash';
import User from "../../models/User";
import bcrypt from 'bcryptjs';

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
    }
  }
}