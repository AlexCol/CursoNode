//!modulos externos
import inquirer from "inquirer";
import chalk from "chalk";

//!meus exports
import { CreateAccount, Deposit, Transferir, VerificaSaldo, Withdraw } from "../services/account";
import MostraErro from "../util/showError";

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
      'Transferir',
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
  } else if (resposta == 'Consultar Saldo') {
    VerificaSaldo();
  } else if (resposta == 'Depositar') {
    Deposit();
  } else if (resposta == 'Sacar') {
    Withdraw();
  } else if (resposta == 'Transferir') {
    Transferir();
  } else if (resposta == 'Sair') {
    console.log(chalk.bgCyan.black('Até logo, nos vemos em breve.'));
    process.exit;
  }
}