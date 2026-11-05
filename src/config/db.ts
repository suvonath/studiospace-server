
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing from environment variables");
}

const client = new MongoClient(uri);

let database: Db;

export async function connectDB(): Promise<Db> {
  if (database) {
    return database;
  }

  await client.connect();

  database = client.db(process.env.DB_NAME || "studiospace");

  await database.command({ ping: 1 });

  console.log("MongoDB connected successfully!");

  return database;
}

export function getDB(): Db {
  if (!database) {
    throw new Error("Database has not been initialized");
  }

  return database;
}
