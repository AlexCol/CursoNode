import { Request, Response, NextFunction } from "express";

export function checkAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userid) {
    res.redirect('/');
    return;
  }
  next();
}