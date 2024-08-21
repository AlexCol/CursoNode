import { Router } from "express";
import AuthController from "../../controllers/Auth/AuthController";

const authRouter = Router();

authRouter.get('/login', AuthController.login);
authRouter.get('/register', AuthController.register);
authRouter.post('/register', AuthController.registerPost);

export default authRouter;