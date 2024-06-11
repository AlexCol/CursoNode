import os from 'os';

console.log(`Dados CPUs: `);
console.log(os.cpus());
console.log(`Memoria Livre: ${os.freemem()}`);
console.log(`Diretorio raiz: ${os.homedir()}`);
console.log(`Tipo de OS: ${os.type()}`);