import mongoose from "mongoose";
import { config } from "./variable.config";
import { DatabaseError } from "../utils/errors/DatabaseError";

export default async function connectDB() {
  await mongoose
    .connect(`mongodb://${config.dbHost}/${config.dbName}`)
    .then(() => {
      console.log(`[MongoDB] - Connected successfully to database`);
    })
    .catch((error) => {
      console.error(`[MongoDB] - Connection failed: ${error.message}`);
    });
}
