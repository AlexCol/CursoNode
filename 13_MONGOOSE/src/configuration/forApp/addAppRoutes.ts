import { Application } from 'express';
import router from '../../routes/router';

function addAppRoutes(app: Application): void {
  app.use('/', router);
}

export default addAppRoutes;