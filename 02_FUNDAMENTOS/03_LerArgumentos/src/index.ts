///exemplo, argumento passado 'nome=alguma coisa'

const argumentos = process.argv;

console.log(process.argv[2].split("=")[1]);
