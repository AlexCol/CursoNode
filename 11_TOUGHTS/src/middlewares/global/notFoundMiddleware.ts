import { Request, Response, NextFunction } from "express";

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log("Pagina não encontrada.");
  res.render('notFound');
}