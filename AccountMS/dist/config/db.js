"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
class MongoConnection {
    constructor() { }
    async init(config) {
        if (!config.uri) {
            throw new Error('MongoDB URI not defined');
        }
        try {
            const conn = await mongoose_1.default.connect(config.uri, config.options);
            logger_1.default.info(`MongoDB Connected: ${conn.connection.host}`);
        }
        catch (error) {
            logger_1.default.error(`MongoDB Connection Error: ${error}`);
            if (error instanceof mongoose_1.default.Connection) {
                process.exit(1);
            }
        }
    }
    close() {
        mongoose_1.default.connection.close();
    }
}
exports.default = MongoConnection;
