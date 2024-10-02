import './db/conn'; // Importa o arquivo de conexão
import { appConfiguration } from "./configuration/forApp/appConfiguration";
import connectToDatabase from './db/conn';
import logger from './configuration/general/logger/logger';

const express = require('express');
const app = express();

appConfiguration(app);

// Função para iniciar o servidor
const startServer = () => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
};

// Conecta ao MongoDB e inicia o servidor após a conexão ser estabelecida
connectToDatabase().then(() => {
  logger.info('MongoDB connection established, starting server...');
  startServer();
}).catch(err => {
  logger.error('Failed to connect to MongoDB:', err);
});