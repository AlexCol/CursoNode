import http from 'http';
import url from "url";

const port = 3000;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  const urlInfo = url.parse(req.url || "", true);
  const name = urlInfo.query.name;

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  let meuHtml = "";
  if (!name) {
    meuHtml += "<h1>Preencha seu nome:</h1>";
    meuHtml += "<form method='GET'>";
    meuHtml += "<input type='text' name='name' />";
    meuHtml += "<input type='submit' value='Enviar'/>";
    meuHtml += "</form>";
  } else {
    meuHtml += `<h1>Seja bem vindo ${name}!</h1>`;
  }

  res.end(meuHtml);
});

server.listen(port, () => {
  console.log(`Servior rodando na porta ${port}`);
});