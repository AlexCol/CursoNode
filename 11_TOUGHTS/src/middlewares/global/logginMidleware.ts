import { Request, Response, NextFunction } from "express";

export function logginMidleware(req: Request, res: Response, next: NextFunction) {
  console.log(`Roda acessada: ${req.path}`);
  next();
}