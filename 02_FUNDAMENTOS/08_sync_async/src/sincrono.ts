import fs from "fs";

export const sincrono = () => {
  console.log("Inicio");

  fs.writeFileSync("arquivo.txt", "meu texto");

  console.log("Fim");
};
