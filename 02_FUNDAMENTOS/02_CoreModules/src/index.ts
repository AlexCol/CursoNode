import path from "path"; //normalmente para importar ua funcionalidade, o nome do import e o do from são iguais

//* ler extensão de arquivo (na verdade é a as letras depois do ultimo ponto)
const extension = path.extname("meu.arquivo.cs");

console.log(extension);
