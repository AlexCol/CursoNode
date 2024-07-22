import { Sequelize } from 'sequelize';

export const conn = new Sequelize(
  'node_mysql',
  'root',
  'ale123',
  {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
  }
);

try {
  conn.authenticate();
  console.log('Conectado');
} catch (err) {
  console.log(err);
}