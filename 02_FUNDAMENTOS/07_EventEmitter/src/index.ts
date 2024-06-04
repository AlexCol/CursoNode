import EventEmitter from "events";

const eventEmitter = new EventEmitter();

eventEmitter.on("myEvent", () => {
  console.log("Executando meu evento");
});

console.log("Antes");

eventEmitter.emit("myEvent");

console.log("Depois");
