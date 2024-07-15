import { Router, Request, Response } from 'express';
import Address from '../../../models/Address';

const addressPostRoutes = Router();

//! realiza criação e devolve pra lista de usuários
addressPostRoutes.post('/create', async (req: Request, res: Response) => {
  const { userid, street, number, city } = req.body;

  try {
    await Address.create({ userid, street, number, city });
  } catch (err) {
    let errorMessage: string;
    if (err instanceof Error)
      errorMessage = err.message;
    else
      errorMessage = "Erro deconhecido";
    res.render("errorPage", { errorMessage });
    return;
  }

  //precisa voltar 2, pois ele volta do DELETE e então do USERS
  res.redirect(`../../users/edit/${userid}`);
});

export default addressPostRoutes;