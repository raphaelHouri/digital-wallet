"use strict";
// client.controller.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const axios_1 = __importDefault(require("axios"));
const app_1 = require("../app");
class ClientController {
    static async getUserById(req, res) {
        try {
            // Assuming you have an account service running on a specific port
            const accountServiceResponse = await axios_1.default.get(`http://${app_1.appConfig.msUrls.accountMS}/api/users/${req.params.clientId}`);
            res.json(accountServiceResponse.data);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async getWalletDeposit(req, res) {
        try {
            // Assuming you have an account service running on a specific port
            const accountServiceResponse = await axios_1.default.get(`http://${app_1.appConfig.msUrls.accountMS}/api/wallets/${req.params.clientId}/deposit`);
            res.json(accountServiceResponse.data);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async getTransactions(req, res) {
        try {
            // Assuming you have a transactions service running on a specific port
            const transactionsServiceResponse = await axios_1.default.get(`http://${app_1.appConfig.msUrls.transactionMS}/api/transactions?clientId=${req.params.clientId}&type=${req.query.type}&dateRange=${req.query.dateRange}`);
            res.json(transactionsServiceResponse.data);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async sendTransaction(req, res) {
        try {
            // Assuming you have a Kafka producer service
            // Also, assuming you have a transactions service running on a specific port
            // You should send the transaction data to Kafka and then call the transactions service
            // to execute the transaction. This is a simplified example.
            // Also, consider adding authentication and validation logic.
            // Send to Kafka (behind the scenes)
            // kafkaProducer.sendTransaction(req.body);
            // Assuming you have a transactions service running on a specific port
            res.status(200).json({ success: 'work' });
            const transactionsServiceResponse = await axios_1.default.post(`http://transactions-service/transactions`, req.body);
            res.json(transactionsServiceResponse.data);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
exports.ClientController = ClientController;
