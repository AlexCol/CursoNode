import express from "express";
import router from "./routes/router";

const port = 5000;

const app = express();

app.use(express.static('public'));

app.use('/', router);

app.listen(port, () => {
  console.log(`App iniciado na porta ${port}`);
});