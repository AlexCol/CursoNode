import * as fs from 'fs';
import { Soma } from "./Second";

console.log("Olá mundo!");

const result = Soma(1, 3);
console.log(result);


////

fs.readFile('./src/arquivo.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err.message);
    } else {
        console.log(data);
    }
});
