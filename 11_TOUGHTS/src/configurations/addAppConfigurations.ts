import { Application } from "express";
import { appConfigureExpressSession } from "./appConfigureExpressSession";
import { appConfigHandleBars } from "./appConfigHandleBars";
import { appAddRoutes } from "./appAddRoutes";
import { addPostRouterGlobalMiddlewares, addPreRouterGlobalMiddlewares } from "./addGlobalMiddlewares";

export function addAppConfigurations(app: Application) {
  appConfigureExpressSession(app);
  appConfigHandleBars(app);
  addPreRouterGlobalMiddlewares(app); //middlewares que serão executados antes das rotas
  appAddRoutes(app);
  addPostRouterGlobalMiddlewares(app);
}