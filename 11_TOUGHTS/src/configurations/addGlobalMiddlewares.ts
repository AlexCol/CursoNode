import { Application } from 'express';
import { sessionControlMiddleWare } from '../middlewares/sessionControlMiddleWare';
import { logginMidleware } from '../middlewares/logginMidleware';
import { notFoundMiddleware } from '../middlewares/notFoundMiddleware';

export function addPreRouterGlobalMiddlewares(app: Application) {

  app.use(logginMidleware);
  app.use(sessionControlMiddleWare);
}

export function addPostRouterGlobalMiddlewares(app: Application) {
  app.use(notFoundMiddleware);
}