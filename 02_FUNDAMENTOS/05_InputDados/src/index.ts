import readline from "readline";

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

reader.question("Qual a sua linguagem preferida?", (language) => {
  console.log(`Minha linguagem preferida é: ${language}`);
  reader.close();
});
