import { Application } from 'express';
import flash from 'express-flash';

export function addFlashMessages(app: Application) {
  app.use(flash());
}