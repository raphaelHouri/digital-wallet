"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletsModel = void 0;
const mongoose_1 = require("mongoose");
const walletsSchema = new mongoose_1.Schema({
    walletId: { type: String, unique: true, required: true },
    userId: { type: String },
    isGroupedWallet: { type: Boolean, required: true },
    groupedUserIds: [{ type: String }],
    groupAdmin: { type: String },
    lastUpdate: { type: Date, default: Date.now },
    lastTransactionId: { type: String },
    balance: {
        ils: { type: Number },
        usd: { type: Number },
        euro: { type: Number },
    },
});
exports.WalletsModel = (0, mongoose_1.model)('Wallet', walletsSchema);
