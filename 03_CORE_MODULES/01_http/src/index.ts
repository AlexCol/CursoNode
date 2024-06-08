import http from 'http';

const port = 3000;

const server = http.createServer((req: http.IncomingMessage, res: http.OutgoingMessage) => {
  res.write("oi http");
  res.end();
});

server.listen(port, () => {
  console.log(`Servior rodando na porta ${port}`);
});