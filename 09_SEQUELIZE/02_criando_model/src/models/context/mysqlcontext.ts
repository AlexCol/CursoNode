import { db } from "../../mysqldb/connection";

//! vincula as tabelas, para que sejam cadastradas no contexto
const User = require('../User');

export async function initDb() {
  return db.sync(); //normal, só vai criar as tabelas se elas não existirem
  //return db.sync({ alter: true }); //força no banco alterações feitas no modelo
}