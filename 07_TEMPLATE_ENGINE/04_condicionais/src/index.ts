import express, { Request, Response } from "express";
import path from "path";
const exphbs = require('express-handlebars'); //necessário importar nesse formato

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); //pra que consiga enchergar dentro da pasta src

app.get('/dashboard', (req: Request, res: Response) => {
  res.render('dashboard');
});

app.get('/', (req: Request, res: Response) => {
  const user = {
    name: 'Alex',
    surname: 'Coletti'
  };

  const auth = false;

  res.render('home', {
    user: user,
    auth
  });
});

app.listen(3000, () => {
  console.log('executando');
});