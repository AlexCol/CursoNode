import { Application } from "express";
import { appConfigHandleBars } from "./appConfigHandleBars";

export function addAppConfigurations(app: Application) {
  appConfigHandleBars(app);
}