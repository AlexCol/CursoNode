import { Request, Response, NextFunction } from "express";
import logger from "../../configuration/general/logger/logger";

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
  logger.error("Pagina não encontrada.");
  //res.render('notFound');
}