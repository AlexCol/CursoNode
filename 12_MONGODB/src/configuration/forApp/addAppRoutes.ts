import { Application } from 'express';
import produtcsRouter from '../../routes/products/produtctsRouter';

function addAppRoutes(app: Application): void {
  app.use('/products', produtcsRouter);
}

export default addAppRoutes;