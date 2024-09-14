import mongoose from "mongoose";
import logger from "./logger.config";
import { config } from "./variable.config";

export default async function connectDB() {
  await mongoose
    .connect(`mongodb://${config.dbHost}/${config.dbName}`)
    .then(() => {
      logger.info(`[MongoDB] - Connected successfully to database`);
    })
    .catch((error) => {
      logger.error(`[MongoDB] - Connection failed: ${error.message}`);
    });
}
