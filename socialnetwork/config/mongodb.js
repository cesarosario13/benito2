const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/database';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connect() {
    try {
        await client.connect();
        console.log('Conectado a MongoDB');

        db = client.db('database');
        return db;

    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        throw error;
    }
}

function getDb() {
    if (!db) {
        throw new Error('No se ha establecido una conexión a la base de datos');
    }
    return db;
}

async function close() {
    try {
        await client.close();
        console.log('Conexión a MongoDB cerrada');
    } catch (error) {
        console.error('Error cerrando la conexión a MongoDB:', error);
    }
}

module.exports = { connect, getDb, close };