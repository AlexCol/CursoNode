import { Application } from "express";
import addDotEnv from "./addDotEnv";
import addCors from "./addCors";
import addExpress from "./addExpress";
import addControllers from "./addControllers";
import { addAppGlobalMiddlewaresBeforeRoutes } from "./addAppGlobalMiddlewares";

export function appConfiguration(app: Application) {
  addDotEnv();
  addCors(app);
  addExpress(app);
  addAppGlobalMiddlewaresBeforeRoutes(app);
  addControllers(app);
}