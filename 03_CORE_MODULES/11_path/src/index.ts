import path from "path";

const customPath = '/relatorios/alex/relatorio1.pdf';

console.log(`Diretorio: ${path.dirname(customPath)}`);
console.log(`Nome base (arquivo): ${path.basename(customPath)}`);
console.log(`Extensão: ${path.extname(customPath)}`);

//! path absoluto
console.log(path.resolve()); //local onde estou
console.log(path.resolve('arquivo.txt')); //local onde vai ser pego o arquivo

//! formar path
const midFolder = 'relatorios';
const fileName = 'alex.txt';

const finalPath = path.join('/', 'arquivos', 'midFolder', fileName);
console.log(finalPath);