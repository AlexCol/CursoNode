import { Router } from "express";
import AuthController from "../../controllers/Auth/AuthController";

const authRouter = Router();

authRouter.get('/login', AuthController.login);
authRouter.post('/login', AuthController.loginPost);
authRouter.get('/register', AuthController.register);
authRouter.post('/register', AuthController.registerPost);
authRouter.get('/logout', AuthController.logout);

export default authRouter;
