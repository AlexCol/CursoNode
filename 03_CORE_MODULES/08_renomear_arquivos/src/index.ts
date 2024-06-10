import http from 'http';
import fs from "fs";
import url from "url";

const existeArquivoBase = fs.existsSync('src/arquivo.txt');

const origin = existeArquivoBase ? 'src/arquivo.txt' : 'src/nome_alterado.txt';
const destiny = !existeArquivoBase ? 'src/arquivo.txt' : 'src/nome_alterado.txt';

fs.rename(origin, destiny, (err) => {
  if (err) {
    if (err instanceof Error)
      console.log(err.message);
    return;
  }
});