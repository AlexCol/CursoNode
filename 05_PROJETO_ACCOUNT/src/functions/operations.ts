//!modulos externos
import inquirer from "inquirer";
import chalk from "chalk";

//!meus exports
import CreateAccount from "./account";
import MostraErro from "./showError";


export default function Operation() {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'O que você deseja fazer?',
    choices: [
      'Criar Conta',
      'Consultar Saldo',
      'Depositar',
      'Sacar',
      'Sair'
    ]
  })
    .then((resposta) => {
      DirecionaOperacao(resposta.action);
    })
    .catch(err => MostraErro(err));
}

function DirecionaOperacao(resposta: string) {
  if (resposta == 'Criar Conta') {
    CreateAccount();
  }
  if (resposta == 'Consultar Saldo') {

  }
  if (resposta == 'Depositar') {

  }
  if (resposta == 'Sacar') {

  }
  if (resposta == 'Sair') {
    console.log(chalk.cyan('Até logo, nos vemos em breve.'));
  }
}