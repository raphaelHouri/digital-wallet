import express from "express";
import logger from "./utils/logger";
import MongoConnection from "./config/db";
import router from "./routes/transaction.route";
import { AppConfig } from "./utils/common_interfaces";
require("dotenv").config();


// Express app
const app = express();

export const appConfig: AppConfig = {
  mongo: {
    uri: process.env.MONGO_URI,
    options: {},
  },
  app: { port: process.env.PORT || 3000 },
};

const mongo = new MongoConnection();

app.use(express.json());
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/v1/", router);
// Start server
app.listen(appConfig.app.port, async () => {
  // init mongo db
  if (appConfig.mongo.uri) {
    await mongo.init(appConfig.mongo);
  }

  logger.info(`Server running on port ${appConfig.app.port}`);
});

export default app;
