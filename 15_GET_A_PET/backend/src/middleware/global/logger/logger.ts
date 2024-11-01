import colours from './colours';

// Função para obter a função chamadora a partir do stack trace
export function getCallingFunction(error: Error): string {
  try {
    const stack = error.stack;
    if (!stack) return '--';

    const line = stack.split('\n')[2];
    const regex = /^.*at\s([a-zA-Z]+).*$/;
    const groups = line.match(regex);

    if (!groups || groups.length < 2) return '--';

    return groups[1];
  } catch {
    return '--';
  }
}

// Funções de logging com diferentes níveis de severidade
export function log(message?: any, ...optionalParams: any[]): void {
  console.log(
    `[${new Date().toLocaleString()}]`,
    colours.fg.magenta,
    '[SERVER-LOG]',
    colours.reset,
    message,
    ...optionalParams
  );
}

export function info(message?: any, ...optionalParams: any[]): void {
  console.info(
    `[${new Date().toLocaleString()}]`,
    colours.fg.cyan,
    '[INFO]',
    colours.reset,
    message,
    ...optionalParams
  );
}

export function warn(message?: any, ...optionalParams: any[]): void {
  console.warn(
    `[${new Date().toLocaleString()}]`,
    colours.fg.yellow,
    '[WARN]',
    colours.reset,
    message,
    ...optionalParams
  );
}

export function error(message?: any, ...optionalParams: any[]): void {
  console.error(
    `[${new Date().toLocaleString()}]`,
    colours.fg.red,
    '[ERROR]',
    colours.reset,
    colours.bg.green,
    `[${getCallingFunction(new Error())}]`,
    colours.reset,
    message,
    ...optionalParams
  );
}

// Objeto logger com todas as funções de logging
const logger = {
  log,
  info,
  warn,
  error,
  warning: warn,
  getCallingFunction
};

// Definição global para o logger
declare global {
  var logging: {
    log: (message?: any, ...optionalParams: any[]) => void;
    info: (message?: any, ...optionalParams: any[]) => void;
    warn: (message?: any, ...optionalParams: any[]) => void;
    warning: (message?: any, ...optionalParams: any[]) => void;
    error: (message?: any, ...optionalParams: any[]) => void;
    getCallingFunction: (error: Error) => string;
  };
}

// Vincula a variável local à variável global
// globalThis.logging = logger;

export default logger;