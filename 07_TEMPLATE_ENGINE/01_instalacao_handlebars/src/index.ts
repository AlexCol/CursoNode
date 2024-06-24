import express, { Request, Response } from "express";
import path from "path";
const exphbs = require('express-handlebars'); //necessário importar nesse formato

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); //pra que consiga enchergar dentro da pasta src

app.get('/', (req: Request, res: Response) => {
  res.render('home', { layout: false });
});

app.listen(3000, () => {
  console.log('executando');
});