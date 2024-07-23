import express from 'express';
import { mysqlContext } from './models/Context/mysqlContext';
import { appConfigHandleBars } from './configurations/appConfigHandleBars';
import { appAddRoutes } from './configurations/appAddRoutes';
import { publicPath } from './util/basePaths';

const app = express();

appConfigHandleBars(app);
appAddRoutes(app);

console.log(publicPath);

async function startServer() {
  try {
    await mysqlContext(); // Sincroniza o banco de dados antes de iniciar o servidor
    app.listen(3000, () => {
      console.log('Servidor ouvindo na porta 3000.');
    });
  } catch (error) {
    console.error('Erro ao inicializar a aplicação:', error);
  }
}
startServer();