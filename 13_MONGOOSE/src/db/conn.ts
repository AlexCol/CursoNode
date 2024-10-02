import mongoose from 'mongoose';
import logger from '../configuration/general/logger/logger'; // Certifique-se que o logger está corretamente configurado

async function connectToDatabase() {
  try {
    logger.info('Attempting to connect to MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/mymongodb', {
      maxPoolSize: 10,           // Limite de conexões simultâneas
      wtimeoutMS: 2500,          // Tempo máximo para operações de gravação
      connectTimeoutMS: 30000,   // Tempo máximo para tentativa de conexão
      socketTimeoutMS: 360000,   // Tempo máximo para operações de socket
      noDelay: true,             // Desativa o algoritmo de Nagle
      maxIdleTimeMS: 600000      // Tempo máximo de inatividade antes de fechar a conexão
    });

    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error('Error connecting to MongoDB:', err);
    process.exit(1); // Encerra o processo se a conexão falhar
  }
}

// Eventos de conexão do Mongoose para monitorar o status da conexão
mongoose.connection.on('connected', () => {
  logger.info('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  logger.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('Mongoose disconnected from DB');
});

// Tentativa de reconexão ao MongoDB se houver desconexão
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  logger.info('Mongoose connection closed due to app termination');
  process.exit(0);
});

export default connectToDatabase;