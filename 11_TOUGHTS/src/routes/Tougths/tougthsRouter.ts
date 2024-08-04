import { Router } from "express";
import TougthsController from "../../controllers/Toughts/TougthsController";

const tougthsRouter = Router();

tougthsRouter.get('/', TougthsController.showToughts);

export default tougthsRouter;