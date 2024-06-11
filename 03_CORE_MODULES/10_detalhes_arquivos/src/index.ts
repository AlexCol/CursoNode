import fs from 'fs';

fs.stat('src/arquivo.txt', (err, stats) => {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log(`É arquivo: ${stats.isFile()}`);
  console.log(`É diretório: ${stats.isDirectory()}`);
  console.log(`É link simbolico: ${stats.isSymbolicLink()}`);
  console.log(`Criado em: ${stats.ctime}`);
  console.log(`Tamanho: ${stats.size}`);
});