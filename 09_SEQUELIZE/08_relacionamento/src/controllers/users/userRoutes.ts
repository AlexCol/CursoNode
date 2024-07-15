import { Router } from 'express';
import userGetRoutes from './get/userGetRoutes';
import userPostRoutes from './post/userPostRoutes';
const userRouter = Router();

userRouter.use(userGetRoutes);
userRouter.use(userPostRoutes);

export default userRouter;