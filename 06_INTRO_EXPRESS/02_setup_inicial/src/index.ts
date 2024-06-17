import express, { NextFunction, Request, Response } from "express";

const app = express();
const port = 3321;


function MeuRetornoGet(req: Request, res: Response) {
  console.log('Executando "Controlador"');
  res.send("Olá mundo!");
}

function MeuMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('Passei pelo middleware');
  //res.send("Erro");
  next();
}

app.get('/', MeuMiddleware, MeuRetornoGet);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});