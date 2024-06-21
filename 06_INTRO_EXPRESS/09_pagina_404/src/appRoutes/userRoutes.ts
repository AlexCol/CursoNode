import { Router, Request, Response } from 'express';
import { pagesPath } from '../../basePaths';

const userRoutes = Router();

userRoutes.get('/add', (req: Request, res: Response) => {
  res.sendFile(`${pagesPath}/userForm.html`);
});

userRoutes.post('/save', (req: Request, res: Response) => {
  console.log(req.body); //para ler o body vai precisar da configuração 'config1' acima
  const { nome, idade } = req.body;
  console.log(`O nome informado é ${nome}`);
  console.log(`E a idade é ${idade}`);
  res.sendFile(`${pagesPath}/userForm.html`);
});

//!parametros dinamicos devem ser ser os 'ultimos' a ser informados, pois se ficarem em cima, o 'add' usado no "/users/add" cairia aqui
//!então quem tem caminho fixo deve ficar sempre mais acima
userRoutes.get('/:id', (req: Request, res: Response) => {
  //const id = req.params.id;
  const { id } = req.params; //tbm pode ser pego de forma 'desestruturada'
  //busca em banco de dados com o id
  console.log(`buscando usuário ${id}`);
  res.sendFile(`${pagesPath}/users.html`);
});

export default userRoutes;