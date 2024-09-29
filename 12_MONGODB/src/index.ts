import { addAppConfigurations } from "./configuration/addAppConfiguration";
import connectToMongo from "./db/conn";

const express = require('express');
const app = express();

addAppConfigurations(app);

app.listen(3000, async () => {
  await connectToMongo();
})

/* pra testar */
/* 
--conn.ts
import { MongoClient } from 'mongodb';

// Connection URI
const uri = 'mongodb://localhost:27017/mymongodb';

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10, // Configura o pool de conexões
});

async function connectToMongo() {
  try {
    if (!client.isConnected()) {
      await client.connect();
      console.log('Connected to MongoDB');
    }
    return client.db(); // Retorna a instância do banco de dados
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}

export default connectToMongo;

--index.ts
import { addAppConfigurations } from "./configuration/addAppConfiguration";
import connectToMongo from "./db/conn";

const express = require('express');
const app = express();

addAppConfigurations(app);

// Middleware para conectar ao MongoDB em cada requisição
app.use(async (req, res, next) => {
  try {
    req.db = await connectToMongo();
    next();
  } catch (error) {
    res.status(500).send('Failed to connect to database');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

*/
