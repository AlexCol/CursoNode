import http from 'http';
import fs from "fs";

const port = 3000;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  fs.readFile('src/mensagem.html', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(data);
      return res.end();
    }
  })
});

server.listen(port, () => {
  console.log(`Servior rodando na porta ${port}`);
});