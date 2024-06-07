import chalk from "chalk";
import inquirer from "inquirer";

async function RealizaPerguntas(): Promise<void> {
  let nome: string;
  let idade: number;

  try {
    const respostas = await inquirer
      .prompt([
        {
          name: "nome",
          message: "Qual o seu nome?",
        },
        {
          name: "idade",
          message: "Qual sua idade?",
        },
      ]);

    nome = respostas.nome;
    idade = respostas.idade;
  } catch (e) {
    throw e;
  }

  const nomeColirido = chalk.black.bgWhite(nome);
  const idadeColorida = chalk.red(idade);
  const saudacao = chalk.blueBright(`Olá ${nomeColirido}. Fico feliz em saber que tem ${idadeColorida} anos.`);
  console.log(saudacao);
}


RealizaPerguntas();
