import express, { Router } from 'express';
import userRoutes from './userRoutes';
import baseRoutes from './baseRoutes';

const router = Router();

//config1 - para ler o body
router.use(express.urlencoded({
  extended: true
}));

router.use('/', baseRoutes); //pra home
router.use('/users', userRoutes);

export default router;