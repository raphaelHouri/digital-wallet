"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModel = void 0;
const mongoose_1 = require("mongoose");
const transactionsSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, default: new mongoose_1.Types.ObjectId },
    amount: { type: Number, required: true },
    currency: { type: String, enum: ['ils', 'usd', 'euro'], default: "ils" },
    transactionId: { type: mongoose_1.Schema.Types.ObjectId, default: new mongoose_1.Types.ObjectId, required: true },
    status: { type: String, enum: ['pending', 'success', 'rejected'], required: true },
    dateCreated: { type: Date, default: Date.now },
    lastUpdateDate: { type: Date, default: Date.now },
    fromWalletId: { type: mongoose_1.Schema.Types.ObjectId, default: new mongoose_1.Types.ObjectId, required: true },
    toWalletId: { type: mongoose_1.Schema.Types.ObjectId, default: new mongoose_1.Types.ObjectId, required: true },
});
exports.TransactionsModel = (0, mongoose_1.model)('Transaction', transactionsSchema);
