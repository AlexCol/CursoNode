import { Application } from 'express';
import { logginHandler } from '../../middlewares/global/logginMidleware';
import { notFoundMiddleware } from '../../middlewares/global/notFoundMiddleware';

export function addAppGlobalMiddlewaresBeforeRoutes(app: Application) {
  app.use(logginHandler);
}

export function addAppGlobalMiddlewaresAfterRoutes(app: Application) {
  app.use(notFoundMiddleware);
}