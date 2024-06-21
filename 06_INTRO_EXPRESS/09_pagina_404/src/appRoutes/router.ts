import express, { Router, Request, Response } from 'express';
import userRoutes from './userRoutes';
import baseRoutes from './baseRoutes';
import { pagesPath } from '../../basePaths';

const router = Router();

//config1 - para ler o body
router.use(express.urlencoded({
  extended: true
}));

router.use('/', baseRoutes); //pra home
router.use('/users', userRoutes);

//!rota para 404, deve ser a ultima
router.use((req: Request, res: Response) => {
  res.sendFile(`${pagesPath}/404.html`);
})

export default router;