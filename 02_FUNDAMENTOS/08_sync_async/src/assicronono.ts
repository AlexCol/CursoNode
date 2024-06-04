import fs from "fs";

export const assicronono = () => {
  console.log("Inicio");

  fs.writeFile("arquivo.txt", "meu texto", async (err) => {
    setTimeout(() => {
      console.log("Arquivo criado");
    }, 1000);
  });

  console.log("Fim");
};
