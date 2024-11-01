import { Application } from 'express';
import router from '../../controllers/router';

function addControllers(app: Application): void {
    app.use(router);
}

export default addControllers;