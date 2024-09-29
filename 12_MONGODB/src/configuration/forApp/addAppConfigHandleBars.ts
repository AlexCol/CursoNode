import express, { Application } from 'express';
import { publicPath, viewsRootPath } from '../../util/basePaths';

//????????????????????????????????????????????????????????????????? configuracoes para usar handlebars principalmente
export function addAppConfigHandleBars(app: Application) {
  //! Importa o módulo express-handlebars
  const exphbs = require('express-handlebars'); //necessário importar nesse formato

  //! Cria uma instância do Handlebars, especificando o diretório de parciais
  const hbs = exphbs.create({
    partialsDir: ['src/views/partials']
  });

  //! Define o Handlebars como o motor de visualização do Express
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');

  //! Define o diretório onde as views estão localizadas
  app.set('views', viewsRootPath);

  //! Define o diretório público para servir arquivos estáticos
  app.use(express.static(publicPath));
}