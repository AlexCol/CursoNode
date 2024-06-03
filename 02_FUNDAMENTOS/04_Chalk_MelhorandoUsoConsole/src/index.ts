import chalk from "chalk";

// Texto simples colorido
console.log(chalk.blue("Hello world!"));

// Texto com fundo colorido
console.log(chalk.bgRed("This is a red background!"));

// Texto em negrito
console.log(chalk.bold("Bold text"));

// Texto sublinhado
console.log(chalk.underline("Underlined text"));

// Combinação de estilos
console.log(
  chalk.blue.bgYellow.bold("Blue text with yellow background and bold")
);

// Encadeamento de estilos
console.log(chalk.red.underline("Red and underlined"));

// Utilização de template literals
console.log(
  `${chalk.green("This is green text")} and ${chalk.red("this is red text")}`
);
