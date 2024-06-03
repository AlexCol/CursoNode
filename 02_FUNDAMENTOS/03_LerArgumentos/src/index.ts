import { Console } from "console";
import minimist from "minimist";
const args = minimist(process.argv.splice(2));
console.log(args);

if (args["nome"]) {
  console.log(`Nome foi passado: ${args["nome"]}`);
} else {
  console.log("Nome não foi passado.");
}

///exemplo, argumento passado 'nome=alguma coisa'

// const argumentos = process.argv.splice(2); //0 e 1 são padrões, do 2 pra frente são customizados

// console.log(argumentos);
