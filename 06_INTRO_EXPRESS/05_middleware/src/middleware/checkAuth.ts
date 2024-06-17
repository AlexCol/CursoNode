import { Request, Response, NextFunction } from "express";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  req.authStatus = false;
  if (req.authStatus) {
    console.log("Está logado, pode continuar");
    next();
  } else {
    console.log("Não está logado. Faça o login para continuar.");
    res.statusCode = 401;
    res.send("Acesso negado");
  }
}