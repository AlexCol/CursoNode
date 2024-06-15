//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!core modules
import fs from 'fs';

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!interface
import { IAccount } from '../model/accountModel';

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!constantes
const accountsDir = 'db/accounts';

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!metodos exportados
export function CreateAccountFile(accountName: string) {
  var fileCompletePath = `${accountsDir}/${accountName}.json`;

  CheckAndBuildDBDir();

  if (AccountExists(accountName)) {
    throw new Error('Essa conta já existe!');
  }

  try {
    fs.writeFileSync(fileCompletePath, '{"balance": 0}');
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : 'Erro no processamento. Cod 001';
    throw new Error(errMessage);
  }
}

export function GetAccount(account: string): IAccount {
  const accountJson = fs.readFileSync(`${accountsDir}/${account}.json`, {
    encoding: 'utf8', flag: 'r'
  });

  return JSON.parse(accountJson);
}

export function AccountExists(account: string): boolean {
  if (fs.existsSync(`${accountsDir}/${account}.json`))
    return true;
  return false;
}

export function SalvaNovoSaldo(accountName: string, account: IAccount) {
  fs.writeFileSync(`${accountsDir}/${accountName}.json`, JSON.stringify(account));
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!metodos privados
function CheckAndBuildDBDir() {
  if (!fs.existsSync(accountsDir)) {
    fs.mkdirSync(accountsDir, { recursive: true });
  }
}