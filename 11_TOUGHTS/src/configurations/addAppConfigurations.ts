import { Application } from "express";
import { appConfigureExpressSession } from "./appConfigureExpressSession";
import { appConfigHandleBars } from "./appConfigHandleBars";
import { appAddRoutes } from "./appAddRoutes";
import { addGlobalMiddlewares } from "./addGlobalMiddlewares";

export function addAppConfigurations(app: Application) {
  appConfigureExpressSession(app);
  appConfigHandleBars(app);
  addGlobalMiddlewares(app);
  appAddRoutes(app);
}