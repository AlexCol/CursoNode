import express from 'express';
import { publicPath, viewsRootPath } from './util/baseConfigs';
import router from './routes';
import { conn } from './connection';
const exphbs = require('express-handlebars'); //necessário importar nesse formato

const app = express();
const hbs = exphbs.create({
  partialsDir: ['src/views/partials']
});

//????????????????????????????????????????????????????????????????? configuracoes
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', viewsRootPath);

app.use(express.static(publicPath));
//????????????????????????????????????????????????????????????????? configuracoes

//!rotas
app.use('/', router);

conn.connect(err => {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log("Conectou");
  app.listen(3000, () => {
    console.log('executando pois conectou');
  });
})

