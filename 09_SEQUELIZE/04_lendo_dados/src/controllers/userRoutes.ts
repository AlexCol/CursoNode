import express, { Router, Request, Response } from 'express';
import User from '../models/User';
const userRouter = Router();

userRouter.get('/', async (req: Request, res: Response) => {
  const users = await User.findAll({ raw: true });

  console.log(users);

  res.render('users', { users });
});

userRouter.get('/create', (req: Request, res: Response) => {
  res.render('adduser');
});

userRouter.post('/create', async (req: Request, res: Response) => {
  const { name, occupation, newsletter, email } = req.body;
  const userNewsLetterOption = newsletter === 'on';

  try {
    await User.create({
      name,
      occupation,
      newsletter: userNewsLetterOption,
      email
    });
  } catch (err) {
    let errorMessage: string;
    if (err instanceof Error)
      errorMessage = err.message;
    else
      errorMessage = "Erro deconhecido";
    res.render("errorPage", { errorMessage });
    return;
  }

  res.render('home');
});

export default userRouter;