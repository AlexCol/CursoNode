import express from "express";
import router from "./appRoutes/router";

const port = 3500;

const app = express();
app.use('', router);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});