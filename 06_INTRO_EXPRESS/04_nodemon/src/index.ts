import express, { NextFunction, Request, Response } from "express";
import path from "path";

const app = express();
const port = 3500;

const parentDir = path.dirname(__dirname); //para subir um nivel, pois por padrão o __dirname está no nivel do src
const basePath = path.join(parentDir, 'templates');

function MeuRetornoGet(req: Request, res: Response) {
  res.sendFile(`${basePath}/index.html`);
}

app.get('/', MeuRetornoGet);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});