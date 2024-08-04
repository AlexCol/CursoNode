import { Application } from 'express';
import router from '../routes/router';

export function appAddRoutes(app: Application) {
  app.use(router);
}