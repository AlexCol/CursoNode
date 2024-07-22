import { db } from "../../db/connection";

//! vincula as tabelas, para que sejam cadastradas no contexto
//const User = require('../User');

export async function mysqlContext() {
  return db.sync({
    //force: true //reiniciar o banco (dropando tabelas e recriando tudo)
    //alter: true //força no banco alterações feitas no modelo
  });
}