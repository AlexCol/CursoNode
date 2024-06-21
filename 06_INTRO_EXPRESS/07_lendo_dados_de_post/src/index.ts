import express, { NextFunction, Request, Response } from "express";
import path from "path";

const parentDir = path.dirname(__dirname); //para subir um nivel, pois por padrão o __dirname está no nivel do src
const basePath = path.join(parentDir, 'templates');
const port = 3500;

const app = express();

//config1 - para ler o body
app.use(express.urlencoded({
  extended: true
}));

//!metoo get padrao para abrir na raiz
function MeuRetornoGet(req: Request, res: Response) {
  res.sendFile(`${basePath}/index.html`);
}
app.get('/', MeuRetornoGet);

app.get('/users/add', (req: Request, res: Response) => {
  res.sendFile(`${basePath}/userForm.html`);
});

app.post('/users/save', (req: Request, res: Response) => {
  console.log(req.body); //para ler o body vai precisar da configuração 'config1' acima
  const { nome, idade } = req.body;
  console.log(`O nome informado é ${nome}`);
  console.log(`E a idade é ${idade}`);
  res.sendFile(`${basePath}/userForm.html`);
});

//!parametros dinamicos devem ser ser os 'ultimos' a ser informados, pois se ficarem em cima, o 'add' usado no "/users/add" cairia aqui
//!então quem tem caminho fixo deve ficar sempre mais acima
app.get('/users/:id', (req: Request, res: Response) => {
  //const id = req.params.id;
  const { id } = req.params; //tbm pode ser pego de forma 'desestruturada'
  //busca em banco de dados com o id
  console.log(`buscando usuário ${id}`);
  res.sendFile(`${basePath}/users.html`);
});


app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});