import { NextFunction, Request, Response } from "express";
import logger from "./logger";

export function logginHandler(req: Request, res: Response, next: NextFunction) {
  logger.log(`Incomming - METHOD [${req.method}] - URL: [${req.url}]`);

  res.on("finish", () => {
    logger.log(`Finishing - METHOD [${req.method}] - URL: [${req.url}] -> STATUS: [${res.statusCode}]`);
  });

  next();
}