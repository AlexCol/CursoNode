//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!modulos externos
import chalk from "chalk";
import inquirer from "inquirer";

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!meus exports
import MostraErro from "../util/showError";
import Operation from '../view/operations';
import { AccountExists, CreateAccountFile, GetAccount, SalvaNovoSaldo } from '../repository/dbFunctions';
import { IAccount } from "../model/accountModel";

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!programa
export function CreateAccount() {
  console.log(chalk.bgGreen.black('Parabéns por usar nosso banco!'));
  console.log(chalk.green('Defina as opções da sua conta a seguir.'))
  BuildAccount();
}

export async function VerificaSaldo() {
  const accountName = await SolicitaConta('verificar o saldo');
  if (!accountName) return;
  const account = GetAccount(accountName);
  console.log(chalk.bgGreenBright.black(`O saldo atual da conta é de: R$ ${account.balance.toFixed(2).replace('.', ',')}`));
  LimpaEmSeguidaVoltaMenuPrincipal();
}

export async function Transferir() {
  try {
    const accountFromName = await SolicitaConta('retirar');
    if (!accountFromName) return;
    const accountFrom = GetAccount(accountFromName);

    const amount = await SolicitaQuantia('transferir');
    if (!amount) return;
    VerificaSeHaSaldoDisponivel(accountFrom, amount);

    const accountToName = await SolicitaConta('depositar');
    if (!accountToName) return;
    VerificaSeMesmaConta(accountToName, accountFromName);
    const accountTo = GetAccount(accountToName);

    RealizaTransferencia(accountFrom, accountTo, amount);

    SalvaNovoSaldo(accountFromName, accountFrom);
    SalvaNovoSaldo(accountToName, accountTo);

    console.log(chalk.magentaBright("Transferencia realizada com sucesso."));
    LimpaEmSeguidaVoltaMenuPrincipal();
  } catch (err) {
    MostraErro(err);
    LimpaEmSeguidaVoltaMenuPrincipal();
  }
}

export async function Deposit() {
  SaqueDeposito('depositar');
}

export async function Withdraw() {
  SaqueDeposito('sacar');
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!metodos privados
function BuildAccount() {
  inquirer.prompt({
    name: 'accountName',
    message: 'Digite um nome para a sua conta.',
  })
    .then((resp) => {
      CreateAccountFile(resp.accountName);
      SaudaAposRetornaMenuPrincipal();
    })
    .catch((err) => {
      MostraErro(err);
      BuildAccount();
    });
};

async function SaqueDeposito(operacao: string) {
  try {
    const accountName = await SolicitaConta(operacao);
    if (!accountName) return;

    const amount = await SolicitaQuantia(operacao);
    if (!amount) return;

    const account = GetAccount(accountName); //garantido que existe com SolicitaConta acima

    if (operacao !== 'depositar')
      VerificaSeHaSaldoDisponivel(account, amount);

    account.balance += amount;
    SalvaNovoSaldo(accountName, account);

    console.log(chalk.bgGreen.black(`Operação realizada com sucesso. Novo saldo: R$ ${account.balance.toFixed(2).replace('.', ',')}`))
    LimpaEmSeguidaVoltaMenuPrincipal();
  } catch (err) {
    MostraErro(err);
    LimpaEmSeguidaVoltaMenuPrincipal();
  }
}

async function SolicitaConta(operacao: string): Promise<string | undefined> {
  return await inquirer.prompt({
    name: 'accountName',
    message: `Qual o nome da conta que deseja ${operacao}?`,
  })
    .then((resp) => {
      const accountName = resp.accountName;
      if (!AccountExists(accountName)) throw new Error('Essa conta não existe!');
      return accountName;
    })
    .catch((err) => {
      MostraErro(err);
      LimpaEmSeguidaVoltaMenuPrincipal();
    });
}

async function SolicitaQuantia(operacao: string): Promise<number | void> {
  return await inquirer.prompt({
    name: 'amount',
    message: `Quanto deseja ${operacao}?`,
  })
    .then((resp) => {
      const valorDigitado = resp.amount.replace(',', '.');

      if (isNaN(valorDigitado)) throw new Error('Valor informádo é inválido.');
      if (Number(valorDigitado) < 0) throw new Error('Valor não pode ser negativo.');
      if (Number(valorDigitado) !== Number(Number(valorDigitado).toFixed(2))) throw new Error('Valor pode ter no maximo duas casas decimais.');

      return Number(valorDigitado) * (operacao === 'sacar' ? -1 : 1);
    })
    .catch((err) => {
      MostraErro(err);
      LimpaEmSeguidaVoltaMenuPrincipal();
    });
}

function VerificaSeHaSaldoDisponivel(account: IAccount, amount: number) {
  if ((account.balance - amount) < 0)
    throw new Error(`Saldo indisponivel. Saldo disponível: R$ ${account.balance.toFixed(2).replace('.', ',')}`);
}

function VerificaSeMesmaConta(accountToName: string, accountFromName: string) {
  if (accountToName === accountFromName) throw new Error('Não pode ser feita transferencia para mesma conta.');
}

function RealizaTransferencia(accountFrom: IAccount, accountTo: IAccount, amount: number) {
  accountFrom.balance -= amount;
  accountFrom.balance = Math.round(accountFrom.balance * 100) / 100;
  accountTo.balance += amount;
  accountTo.balance = Math.round(accountTo.balance * 100) / 100;

}

function SaudaAposRetornaMenuPrincipal() {
  console.log(chalk.green('Parabéns, sua conta foi criada com sucesso.'));
  LimpaEmSeguidaVoltaMenuPrincipal();
}

function LimpaEmSeguidaVoltaMenuPrincipal() {
  setTimeout(() => {
    console.clear();
    Operation();
  }, 2000);
}