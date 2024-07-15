import express, { Router, Request, Response } from 'express';
import User from '../../../models/User';
const userPostRoutes = Router();

//! executa a criação e manda de volta para a home
userPostRoutes.post('/create', async (req: Request, res: Response) => {
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
userPostRoutes.post('/update/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, occupation, email, newsletter } = req.body;

  await User.update({ name, occupation, email, newsletter: newsletter === 'on' ? true : false }, { where: { userid: id } });

  //precisa voltar 2, pois ele volta do DELETE e então do USERS
  res.redirect('../../users');
});

//! realiza exclusão e devolve pra lista de usuários
userPostRoutes.post('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  await User.destroy({ where: { userid: id } });

  //precisa voltar 2, pois ele volta do DELETE e então do USERS
  res.redirect('../../users');
});

export default userPostRoutes;