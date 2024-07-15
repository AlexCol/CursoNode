import { Router } from 'express';
import addressPostRoutes from './post/addressPostRoutes';
const addressRoutes = Router();

addressRoutes.use(addressPostRoutes);

export default addressRoutes;