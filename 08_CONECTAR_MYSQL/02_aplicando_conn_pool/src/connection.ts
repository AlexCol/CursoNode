import mysql from 'mysql';

export const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: 'ale123',
  port: 3306,
  database: 'node_mysql'
});
