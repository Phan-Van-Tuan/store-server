import mongoose from "mongoose";
import { config } from "./variable.config";

mongoose
  .connect(`mongodb://${config.dbHost}/${config.dbUser}`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
