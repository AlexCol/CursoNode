import path from 'path';
import fs from 'fs';
import { modelsRootPath } from '../../util/basePaths';

export async function InitializeTables() {
  await importModelsFromDir(modelsRootPath);
}

async function importModelsFromDir(modelsPath: string) {
  const files = fs.readdirSync(modelsPath);

  for (const file of files) {
    const filePath = path.join(modelsPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Se é um diretório, chamar a função recursivamente
      await importModelsFromDir(filePath);
    } else if (filePath.endsWith('.ts')) {
      // Se é um arquivo .ts, importar o modelo
      await import(filePath);
    }
  }
}