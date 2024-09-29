import { appConfiguration } from "./configuration/forApp/AppConfiguration";
import connectToMongo from "./db/conn";

const express = require('express');
const app = express();

appConfiguration(app);

app.listen(3000, async () => {
  await connectToMongo();
})