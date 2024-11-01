import logger from "../middleware/global/logger/logger";

const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/getapet';

// Criar um client Mongo, que tenha um pool de conexões de 10 e feche conexões ociosas após 10 minutos
const client = new MongoClient(uri, {
    maxPoolSize: 10,
    wtimeoutMS: 2500,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 360000,
    noDelay: true,
    maxIdleTimeMS: 600000
});

async function connectToMongo() {
    try {
        // Conectar ao MongoDB; o driver gerencia o pool de conexões automaticamente
        await client.connect();
        logger.info('Connected to MongoDB');
        return client.db();
    } catch (error) {
        logger.error('Failed to connect to MongoDB', error);
        throw error;
    }
}

// Fechar o cliente corretamente quando o processo for encerrado
process.on('SIGINT', async () => {
    try {
        await client.close(); // Fecha todas as conexões no pool
        logger.info('MongoDB connection closed');
    } catch (error) {
        logger.error('Error closing MongoDB connection', error);
    } finally {
        process.exit(0);
    }
});

export default connectToMongo;
