import http from 'http';
import fs from "fs";
import url from "url";

fs.unlink('src/arquivo.txt', (err) => {
  if (err) {
    if (err instanceof Error)
      console.log(err.message);
    return;
  }
});