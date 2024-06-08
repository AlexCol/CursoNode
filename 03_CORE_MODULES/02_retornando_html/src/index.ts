import http from 'http';

const port = 3000;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  let meuHtml = "";
  meuHtml += "<h1>Olá, esté meu primeiro server com html!</h1>";
  meuHtml += "<p>Testando atualização.</p>";
  res.end(meuHtml);
});

server.listen(port, () => {
  console.log(`Servior rodando na porta ${port}`);
});