import { db } from "../../mysqldb/connection";

//! vincula as tabelas, para que sejam cadastradas no contexto
const User = require('../User');
const Adress = require('../Adress');

export async function initDb() {
  return db.sync(); //normal, só vai criar as tabelas se elas não existirem
  //return db.sync({ force: true }); //reiniciar o banco (dropando tabelas e recriando tudo)
  //return db.sync({ alter: true }); //força no banco alterações feitas no modelo
}