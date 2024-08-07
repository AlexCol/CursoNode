import express from 'express';
import { publicPath, viewsRootPath } from './util/basePaths';
import router from './controllers/routes';
import { db } from './mysqldb/connection';
import { initDb } from './models/context/mysqlcontext';
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

initDb()
  .then(() => {
    app.listen(3000);
  })
  .catch(err => console.log(err));