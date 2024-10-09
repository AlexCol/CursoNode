import { Application } from 'express';
import router from '../../controllers/router';

function addAppRoutes(app: Application): void {
  app.use('/', router);
}

export default addAppRoutes;