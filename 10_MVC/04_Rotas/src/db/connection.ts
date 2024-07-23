import { Console } from 'console';
import { Sequelize } from 'sequelize';

export const db = new Sequelize(
  'aulas2_node',
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

export default db;