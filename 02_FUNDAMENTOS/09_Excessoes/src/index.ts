try {
  throw new Error("Minha excesssao");
} catch (error) {
  if (error instanceof Error) {
    console.log(`Erro: ${error.message}`);
  } else {
    console.log("Erro desconhecido");
  }
}