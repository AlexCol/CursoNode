import { Application } from 'express';
import { logginHandler } from '../../middleware/global/logger/logginMidleware';

export function addAppGlobalMiddlewaresBeforeRoutes(app: Application) {
  app.use(logginHandler);
}