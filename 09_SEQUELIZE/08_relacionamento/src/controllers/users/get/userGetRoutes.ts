import express, { Router, Request, Response } from 'express';
import User from '../../../models/User';
const userGetRoutes = Router();

//! busca todos e chama view pra visualizar
userGetRoutes.get('/', async (req: Request, res: Response) => {
  const users = await User.findAll({ raw: true });

  console.log(users);

  res.render('users', { users });
});

//! chama view de criação de novo usuário
userGetRoutes.get('/create', (req: Request, res: Response) => {
  res.render('adduser');
});

//! realiza atualização e devolve pra lista de usuários
userGetRoutes.get('/edit/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findOne({ raw: true, where: { userid: id } });

  res.render('useredit', { user });
});

//! busca por id e chama view pra visualizar
//? variaveis dinamicas devem ficar mais abaixo, pois se chamo 'users/create' ele entende que create é o id e se perde
userGetRoutes.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findOne({ raw: true, where: { userid: id } });

  res.render('userview', { user });
});

export default userGetRoutes;