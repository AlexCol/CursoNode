import http from 'http';
import fs, { appendFile } from "fs";
import url from "url";

const port = 3000;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  const urlInfo = url.parse(req.url || "", true);

  const fileName = 'src/' + urlInfo.pathname?.substring(1);

  if (fileName?.includes('html')) {
    if (fs.existsSync(fileName)) {
      fs.readFile(fileName.toString(), (err, data) => {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write(data);
        return res.end();
      });
    } else {
      fs.readFile('src/404.html', (err, data) => {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write(data);
        return res.end();
      });
    }
  }
});

server.listen(port, () => {
  console.log(`Servior rodando na porta ${port}`);
});