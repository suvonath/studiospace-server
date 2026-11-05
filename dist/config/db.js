"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = exports.connectDB = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || "studiospace";
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing from environment variables");
}
const client = new mongodb_1.MongoClient(MONGODB_URI);
let database;
const connectDB = async () => {
    try {
        await client.connect();
        database = client.db(DB_NAME);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
const getDB = () => {
    if (!database) {
        throw new Error("Database is not connected yet");
    }
    return database;
};
exports.getDB = getDB;
