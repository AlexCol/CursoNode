
import { Sequelize } from 'sequelize';
import { InitializeTables } from './InitTables/InitializeTables';

export const db = new Sequelize(
  'toughts',
  'root',
  'ale123',
  {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    pool: {
      max: 10,        // Número máximo de conexões no pool
      min: 0,         // Número mínimo de conexões no pool
      acquire: 30000, // Tempo máximo (em ms) para obter uma conexão do pool
      idle: 10000     // Tempo máximo (em ms) que uma conexão pode estar ociosa antes de ser liberada
    }
  }
);

export async function dbContext() {
  await InitializeTables();

  return db.sync({
    //force: true //reiniciar o banco (dropando tabelas e recriando tudo)
    //alter: true //força no banco alterações feitas no modelo
  });
}

export default db;