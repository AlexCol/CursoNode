import http from 'http';
import fs, { appendFile } from "fs";
import url from "url";

const port = 3000;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  const urlInfo = url.parse(req.url || "", true);
  const name = urlInfo.query.name?.toString();

  if (!name) {
    fs.readFile('src/index.html', (err, data) => {
      if (!err) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write(data);
        return res.end();
      } else {
        console.log(err);
      }
    })
  } else {
    fs.writeFile("src/arquivo.txt", name + '\n', { flag: 'a' }, () => {
      res.writeHead(302, {
        location: '/'
      })
      return res.end();
    })
  }

});

server.listen(port, () => {
  console.log(`Servior rodando na porta ${port}`);
});