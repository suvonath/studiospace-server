"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
exports.getDB = getDB;
const mongodb_1 = require("mongodb");
const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error("MONGODB_URI is missing from environment variables");
}
const client = new mongodb_1.MongoClient(uri);
let database;
async function connectDB() {
    if (database) {
        return database;
    }
    await client.connect();
    database = client.db(process.env.DB_NAME || "studiospace");
    await database.command({ ping: 1 });
    console.log("MongoDB connected successfully!");
    return database;
}
function getDB() {
    if (!database) {
        throw new Error("Database has not been initialized");
    }
    return database;
}
