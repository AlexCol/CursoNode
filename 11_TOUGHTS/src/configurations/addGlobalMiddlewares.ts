import { Application } from 'express';
import router from '../routes/router';
import { sessionControlMiddleWare } from '../middlewares/sessionControlMiddleWare';

export function addGlobalMiddlewares(app: Application) {
  app.use(sessionControlMiddleWare);
}