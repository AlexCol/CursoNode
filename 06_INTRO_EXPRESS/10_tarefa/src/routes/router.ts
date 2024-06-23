import { Router } from 'express';
import { GetHomePage } from '../services/homeService';
import { GetNotFoundPage } from '../services/NotFoundService';
import userRoutes from './userRoutes/userRoutes';

const router = Router();

router.get('/', GetHomePage);

router.use('/users', userRoutes);

router.use(GetNotFoundPage);

export default router;