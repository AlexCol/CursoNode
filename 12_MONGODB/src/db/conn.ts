const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017/mymongodb';

const client = new MongoClient(uri);

async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}
export default connectToMongo;