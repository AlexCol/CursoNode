import fs from 'fs';

const ChecaPasta = (): boolean => {
  const existePasta = fs.existsSync('./minhaPasta');
  if (existePasta) {
    console.log('Existe');
  } else {
    console.log('Não existe');
  }
  return existePasta;
};

const CriaPasta = () => {
  fs.mkdirSync('./minhaPasta');
};

if (!ChecaPasta())
  CriaPasta();
ChecaPasta();