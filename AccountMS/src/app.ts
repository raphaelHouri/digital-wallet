import express from "express";
import logger from "./utils/logger";
import MongoConnection, { MongoDbConfig } from "./config/db";
import router from "./routes/account.route";
require("dotenv").config();

interface AppConfig {
  mongo: MongoDbConfig;
  app: { port: number | string };
  msUrls: {
    accountMS: string;
    transactionMS: string;
    notificationMS: string;
  };
}

// Express app
const app = express();

export const appConfig: AppConfig = {
  mongo: {
    uri: process.env.MONGO_URI,
    options: {},
  },
  app: { port: process.env.PORT || 3000 },
  msUrls: {
    accountMS: process.env.ACCOUNT_MS_URI || "",
    transactionMS: process.env.TRANSACTION_MS_URI || "",
    notificationMS: process.env.NOTIFICATION_MS_URI || "",
  },
};

// Init mongo and kafka clients
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
