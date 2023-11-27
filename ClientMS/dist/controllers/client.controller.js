"use strict";
// client.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const app_1 = require("../app");
const request_utils_1 = require("../utils/request_utils");
class ClientController {
    static async getUserById(req, res) {
        const url = `${app_1.appConfig.msUrls.accountMS}api/v1/user/${req.params.userId}`;
        await (0, request_utils_1.fetcher)(res, url, "GET");
    }
    static async getWalletDeposit(req, res) {
        const url = `${app_1.appConfig.msUrls.accountMS}api/v1/wallet/${req.params.userId}`;
        await (0, request_utils_1.fetcher)(res, url, "GET");
    }
    static async getTransactions(req, res) {
        const url = `${app_1.appConfig.msUrls.transactionMS}api/v1/transactions`;
        await (0, request_utils_1.fetcher)(res, url, "POST", req.body);
    }
    static async sendTransaction(req, res) {
        const url = `${app_1.appConfig.msUrls.transactionMS}api/v1/transactions/execute`;
        await (0, request_utils_1.fetcher)(res, url, "POST", req.body);
    }
}
exports.ClientController = ClientController;
