import { Router } from "express";
import TougthsController from "../../controllers/Toughts/TougthsController";
import { checkAuthMiddleware } from "../../middlewares/auth/checkAuthMiddleware";

const tougthsRouter = Router();

tougthsRouter.use(checkAuthMiddleware);

tougthsRouter.get('/add', TougthsController.createTought);
tougthsRouter.post('/add', TougthsController.createToughtSave);
tougthsRouter.get('/dashboard', TougthsController.dashboard);
tougthsRouter.get('/', TougthsController.showToughts);

export default tougthsRouter;
