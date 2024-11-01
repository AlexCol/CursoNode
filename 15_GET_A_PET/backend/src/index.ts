import express from 'express';
import { appConfiguration } from './configuration/forApp/appConfiguration';
import connectToMongo from './db/conn';
import logger from './middleware/global/logger/logger';

const app = express();
appConfiguration(app);

const port = process.env.BACKPORT || 3000;
const startServer = () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

// Conecta ao MongoDB e inicia o servidor após a conexão ser estabelecida
connectToMongo().then(() => {
    logger.info('MongoDB connection established, starting server...');
    startServer();
}).catch(err => {
    logger.error('Failed to connect to MongoDB:', err);
});