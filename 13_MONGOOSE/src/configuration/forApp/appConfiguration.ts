import { Application } from "express";
import addAppRoutes from "./addAppRoutes";
import { addAppGlobalMiddlewaresAfterRoutes, addAppGlobalMiddlewaresBeforeRoutes } from "./addAppGlobalMiddlewares";
import { addAppConfigHandleBars } from "./addAppConfigHandleBars";

export function appConfiguration(app: Application) {
  addAppConfigHandleBars(app);
  addAppGlobalMiddlewaresBeforeRoutes(app);
  addAppRoutes(app);
  addAppGlobalMiddlewaresAfterRoutes(app);
}