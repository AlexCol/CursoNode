import { Router, Request, Response } from 'express';
import { checkAuth } from "../middleware/checkAuth";

const userRoutes = Router();

//se ativar aqui, posso remover o checkAuth de cada chamada, bom se quiser autenticar todos
//userRoutes.use(checkAuth);

userRoutes.get('/:id', checkAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`Veio id: ${id}`);
})

userRoutes.get('/name/:name', (req: Request, res: Response) => {
  const { name } = req.params;
  res.send(`Veio o nome; ${name}`);
})

export default userRoutes;