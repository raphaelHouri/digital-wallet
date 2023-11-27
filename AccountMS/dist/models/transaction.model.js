"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModel = void 0;
const mongoose_1 = require("mongoose");
const transactionsSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, unique: true, required: true },
    status: { type: String, enum: ['pending', 'success', 'rejected'], required: true },
    dateCreated: { type: Date, default: Date.now },
    lastUpdateDate: { type: Date },
    fromWalletId: { type: String, required: true },
    toWalletId: { type: String, required: true },
});
exports.TransactionsModel = (0, mongoose_1.model)('Transaction', transactionsSchema);
