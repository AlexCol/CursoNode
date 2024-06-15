//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!core modules
import fs from 'fs';
import path from "path";

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!modulos externos
import chalk from "chalk";
import inquirer from "inquirer";

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!meus exports
import MostraErro from "./showError";
import Operation from './operations';

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!constantes
const accountsDir = 'db/accounts';

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!programa
export default function CreateAccount() {
  console.log(chalk.bgGreen.black('Parabéns por usar nosso banco!'));
  console.log(chalk.green('Defina as opções da sua conta a seguir.'))
  BuildAccount();
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!metodos privados
function BuildAccount() {
  inquirer.prompt({
    name: 'accountName',
    message: 'Digite um nome para a sua conta.',
  })
    .then((resp) => {
      if (!CreateAccountFile(resp.accountName))
        BuildAccount();
      else
        SaudaAposRetornaMenuPrincipal()
    })
    .catch((err) => MostraErro(err));
};

function SaudaAposRetornaMenuPrincipal() {
  console.log(chalk.green('Parabéns, sua conta foi criada com sucesso.'));
  setTimeout(() => {
    console.clear();
    Operation();
  }, 2000);
}

function CreateAccountFile(accountName: string): boolean {
  var fileCompletePath = `${accountsDir}/${accountName}.json`;

  if (!fs.existsSync(accountsDir)) {
    fs.mkdirSync(accountsDir, { recursive: true });
  }

  if (fs.existsSync(fileCompletePath)) {
    console.log(chalk.bgRed.black('Essa conta já existe!'));
    return false;
  }

  try {
    fs.writeFileSync(fileCompletePath, '{"balance": 0}');
    return true;
  } catch (err) {
    MostraErro(err);
    return false;
  }
}