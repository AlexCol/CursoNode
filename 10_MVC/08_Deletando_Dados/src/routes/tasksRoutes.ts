import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

const tasksRoutes = Router();

//! views
tasksRoutes.get('/', TaskController.viewShowTasks);
tasksRoutes.get('/add', TaskController.viewCreateTask);

//! back end operations
tasksRoutes.post('/add', TaskController.createTask);
tasksRoutes.post('/remove', TaskController.deleteTask)

export default tasksRoutes;