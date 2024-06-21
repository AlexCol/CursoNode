import express, { NextFunction, Request, Response } from "express";
import path from "path";

const parentDir = path.dirname(__dirname); //para subir um nivel, pois por padrão o __dirname está no nivel do src
const basePath = path.join(parentDir, 'templates');
const port = 3500;

const app = express();

function MeuRetornoGet(req: Request, res: Response) {
  res.sendFile(`${basePath}/index.html`);
}
app.get('/', MeuRetornoGet);


app.get('/users/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  //busca em banco de dados com o id
  console.log(`buscando usuário ${id}`);
  res.sendFile(`${basePath}/users.html`);
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});