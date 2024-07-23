import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

const tasksRoutes = Router();

tasksRoutes.get('/', TaskController.showTasks);
tasksRoutes.get('/add', TaskController.createTask);

export default tasksRoutes;