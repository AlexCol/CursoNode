import { Request, Response, NextFunction } from "express";

export function sessionControlMiddleWare(req: Request, res: Response, next: NextFunction) {
  if (req.session.userid) { //session.d.ts para criar o campo userid, que não é nativo de session
    res.locals.session = req.session;
  }
  next();
}