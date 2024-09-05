import express from "express";
import { config } from "./configs/variable.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import router from "./routers";
import connectDB from "./configs/database.config";

const app = express();
const PORT = config.port || 3000;

connectDB();
app.use(express.json());
app.use("/api/v1", router);
app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Node.js!");
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
