import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

const tasksRoutes = Router();

//! views
tasksRoutes.get('/', TaskController.viewShowTasks);
tasksRoutes.get('/add', TaskController.viewCreateTask);
tasksRoutes.get('/edit/:id', TaskController.viewUpdateTask);

//! back end operations
tasksRoutes.post('/add', TaskController.createTask);
tasksRoutes.post('/remove', TaskController.deleteTask);
tasksRoutes.post('/edit', TaskController.updateTask);

export default tasksRoutes;