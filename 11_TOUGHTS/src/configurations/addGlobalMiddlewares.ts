import { Application } from 'express';
import { sessionControlMiddleWare } from '../middlewares/global/sessionControlMiddleWare';
import { logginMidleware } from '../middlewares/global/logginMidleware';
import { notFoundMiddleware } from '../middlewares/global/notFoundMiddleware';

export function addPreRouterGlobalMiddlewares(app: Application) {
  app.use(logginMidleware);
  app.use(sessionControlMiddleWare);
}

export function addPostRouterGlobalMiddlewares(app: Application) {
  app.use(notFoundMiddleware);
}