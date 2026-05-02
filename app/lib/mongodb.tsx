import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = "store_database";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb() {
  if (cachedDb) return cachedDb;

  if (!cachedClient) {
    cachedClient = await MongoClient.connect(MONGODB_URI);
  }
  
  cachedDb = cachedClient.db(DB_NAME);
  return cachedDb;
}