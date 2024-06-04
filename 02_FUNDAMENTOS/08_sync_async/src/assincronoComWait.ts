import fs from "fs/promises";

export const assincronoComWait = async () => {
  console.log("Inicio");
  await fs.writeFile("arquivo.txt", "meu texto").then((resp) => {
    console.log("Arquivo criado");
  }).catch((err) => {
    console.log("Erro ao gravar.")
  });

  console.log("Fim");
};
