import express from 'express';
import { appConfiguration } from './configuration/forApp/appConfiguration';

const app = express();
appConfiguration(app);

const startServer = () => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
};

startServer();