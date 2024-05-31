///exemplo, argumento passado 'nome=alguma coisa'

const argumentos = process.argv.splice(2); //0 e 1 são padrões, do 2 pra frente são customizados

console.log(argumentos);
