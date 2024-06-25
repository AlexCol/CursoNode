import express, { Request, Response } from "express";
import path from "path";
const exphbs = require('express-handlebars'); //necessário importar nesse formato

const app = express();
const hbs = exphbs.create({
  partialsDir: ['src/views/partials']
});

//????????????????????????????????????????????????????????????????? configuracoes
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); //pra que consiga enchergar dentro da pasta src
//????????????????????????????????????????????????????????????????? configuracoes

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! rotas
app.get('/blog', (req: Request, res: Response) => {
  const posts = [
    {
      title: 'Aprender Node.Js',
      category: 'JavaScript',
      body: 'Este artigo vai te ajudar a aprender nodejs...',
      comments: 4
    },
    {
      title: 'Aprender React',
      category: 'Typescript',
      body: 'Este artigo vai te ajudar a aprender react',
      comments: 4
    },
    {
      title: 'Aprender CSharp',
      category: 'CSharp',
      body: 'Este artigo vai te ajudar a aprender CSharp',
      comments: 4
    }
  ];

  res.render('blog', { posts });
});

app.get('/post', (req: Request, res: Response) => {
  const post = {
    title: 'Aprender Node.Js',
    category: 'JavaScript',
    body: 'Este artigo vai te ajudar a aprender nodejs...',
    comments: 4
  }

  res.render('blogpost', { post });
});

app.get('/dashboard', (req: Request, res: Response) => {
  const resultadoPorSetor = [{ setor: "Faturamento", resultado: 100 }, { setor: "TI", resultado: 120 }, { setor: "Contabilidade", resultado: 80 }]

  res.render('dashboard', { resultadoPorSetor });
});

app.get('/', (req: Request, res: Response) => {
  const user = {
    name: 'Alex',
    surname: 'Coletti'
  };

  const auth = true;

  res.render('home', {
    user: user,
    auth
  });
});
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! rotas

app.listen(3000, () => {
  console.log('executando');
});