import mysql from 'mysql';

export const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'ale123',
  port: 3306,
  database: 'node_mysql'
});
