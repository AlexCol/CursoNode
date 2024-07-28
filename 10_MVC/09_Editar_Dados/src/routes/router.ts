import express, { Router, Request, Response } from 'express';
import tasksRoutes from './tasksRoutes';

const router = Router();

//????????????????????????????????????????????????????????????????? configuracoes
router.use(express.urlencoded({
  extended: true
}));
router.use(express.json());
//????????????????????????????????????????????????????????????????? configuracoes

/* exemplo de uma rota retornando dados e não uma pagina */
router.get('/', (req: Request, res: Response) => {
  // res.send({
  //   dados: "Meus dados"
  // })
  res.redirect('/tasks');
})

router.use('/tasks', tasksRoutes);

export default router;