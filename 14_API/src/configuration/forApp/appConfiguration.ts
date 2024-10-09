import { Application } from "express";
import addAppRoutes from "./addAppRoutes";

export function appConfiguration(app: Application) {
  addAppRoutes(app);
}