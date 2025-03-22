const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb://localhost:27017/TiempoGestor";
let client;
let db;

async function connectToMongoDB() {
    try {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db("TiempoGestor");
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        throw error;
    }
}

function getDb() {
    if (!db) {
        throw new Error('No se ha establecido una conexión a MongoDB');
    }
    return db;
}

module.exports = { connectToMongoDB, getDb, ObjectId };