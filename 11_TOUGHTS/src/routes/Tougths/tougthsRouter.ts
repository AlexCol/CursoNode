import { Router } from "express";
import TougthsController from "../../controllers/Toughts/TougthsController";
import { checkAuthMiddleware } from "../../middlewares/auth/checkAuthMiddleware";

const tougthsRouter = Router();

tougthsRouter.use(checkAuthMiddleware);

tougthsRouter.get('/add', TougthsController.createTought);
tougthsRouter.post('/add', TougthsController.createToughtSave);
tougthsRouter.get('/edit/:id', TougthsController.updateTought);
tougthsRouter.post('/edit', TougthsController.updateToughtSave);
tougthsRouter.get('/dashboard', TougthsController.dashboard);
tougthsRouter.post('/remove', TougthsController.removeTought);
tougthsRouter.get('/', TougthsController.showToughts);

export default tougthsRouter;
