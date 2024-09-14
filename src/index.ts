import express from "express";
import morgan from "morgan";
import router from "./routers";
import logger from "./configs/logger.config";
import connectDB from "./configs/database.config";
import { config } from "./configs/variable.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();
const PORT = config.port || 3000;

connectDB();
app.use(express.json());
app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.use("/api/v1", router);
app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Node.js!");
});
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
