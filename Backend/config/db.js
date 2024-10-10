const { MongoClient } = require('mongodb');
const url = "mongodb+srv://utsavraj626:cW6I6il4sRop4cRj@cluster0.trrzn.mongodb.net/xenon?retryWrites=true&w=majority&appName=Cluster0";
const dbName = 'vacationRentals';
let db;

async function connectToDb() {
    if (!db) {
        try {
            const client = await MongoClient.connect(url);
            db = client.db(dbName);
            console.log("Connected to Database");
        } catch (error) {
            console.error("Failed to connect to the database", error);
            throw new Error("Database connection failed");
        }
    }
    return db;
}

module.exports = connectToDb;
