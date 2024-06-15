//!modulos externos
import chalk from "chalk";

export default function MostraErro(err: any) {
  if (err instanceof Error)
    console.log(chalk.bgRed.black(err.message));
}