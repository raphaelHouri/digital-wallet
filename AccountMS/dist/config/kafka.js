"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const logger_1 = __importDefault(require("../utils/logger"));
class KafkaClient {
    constructor() {
        this.initialized = false;
    }
    static async getInstance(config) {
        if (!KafkaClient.instance) {
            KafkaClient.instance = new KafkaClient();
            await KafkaClient.instance.init(config);
        }
        return KafkaClient.instance;
    }
    async init({ clientId, brokers, retry }) {
        if (!this.initialized) {
            this.kafka = new kafkajs_1.Kafka({
                clientId,
                brokers,
                retry
            });
            await this.connect();
            this.initialized = true;
        }
    }
    async connect() {
        try {
            const admin = this.kafka.admin();
            await admin.connect();
            logger_1.default.info("Kafka connected!");
        }
        catch (error) {
            logger_1.default.error("Failed to connect Kafka", error);
            process.exit(1);
        }
    }
}
exports.default = KafkaClient;
