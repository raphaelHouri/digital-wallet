import express from "express";
// import KafkaClient from "./config/kafka";
import logger from "./utils/logger";
import router from "./routes/client.route";
require("dotenv").config();

interface AppConfig {
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
  app: { port: process.env.PORT || 3000 },
  msUrls: {
    accountMS: process.env.ACCOUNT_MS_URI || "",
    transactionMS: process.env.TRANSACTION_MS_URI || "",
    notificationMS: process.env.NOTIFICATION_MS_URI || "",
  },
};


app.use(express.json());
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/v1/", router);
// Start server
app.listen(appConfig.app.port, async () => {


  logger.info(`Server running on port ${appConfig.app.port}`);
});

export default app;
