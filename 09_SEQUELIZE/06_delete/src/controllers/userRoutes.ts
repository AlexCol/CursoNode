import express, { Router, Request, Response } from 'express';
import User from '../models/User';
const userRouter = Router();

//! busca todos e chama view pra visualizar
userRouter.get('/', async (req: Request, res: Response) => {
  const users = await User.findAll({ raw: true });

  console.log(users);

  res.render('users', { users });
});

//! chama view de criação de novo usuário
userRouter.get('/create', (req: Request, res: Response) => {
  res.render('adduser');
});

//! busca por id e chama view pra visualizar
//? variaveis dinamicas devem ficar mais abaixo, pois se chamo 'users/create' ele entende que create é o id e se perde
userRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findOne({ raw: true, where: { userid: id } });

  res.render('userview', { user });
});

//! executa a criação e manda de volta para a home
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

  res.redirect('/');
});

//! realiza exclusão e devolve pra lista de usuários
userRouter.post('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  await User.destroy({ where: { userid: id } });

  //precisa voltar 2, pois ele volta do DELETE e então do USERS
  res.redirect('../../users');
});

export default userRouter;