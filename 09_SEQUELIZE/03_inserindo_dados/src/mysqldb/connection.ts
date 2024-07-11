import { Sequelize } from 'sequelize';

export const db = new Sequelize(
  'node_mysql',
  'root',
  'ale123',
  {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
  }
);