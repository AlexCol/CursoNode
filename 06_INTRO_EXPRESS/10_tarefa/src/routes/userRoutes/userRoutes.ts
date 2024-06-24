import { Router } from "express";
import { GetUsersPage } from "../../services/usersService";

const userRoutes = Router();

userRoutes.get('/', GetUsersPage);

export default userRoutes;