"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const express_1 = __importDefault(require("express"));
// import KafkaClient from "./config/kafka";
const logger_1 = __importDefault(require("./utils/logger"));
const db_1 = __importDefault(require("./config/db"));
const client_route_1 = __importDefault(require("./routes/client.route"));
require("dotenv").config();
// Express app
const app = (0, express_1.default)();
exports.appConfig = {
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
const mongo = new db_1.default();
app.use(express_1.default.json());
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
app.use("/api/v1/", client_route_1.default);
// Start server
app.listen(exports.appConfig.app.port, async () => {
    // init mongo db
    if (exports.appConfig.mongo.uri) {
        await mongo.init(exports.appConfig.mongo);
    }
    logger_1.default.info(`Server running on port ${exports.appConfig.app.port}`);
});
exports.default = app;
