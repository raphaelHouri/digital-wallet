"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletsModel = void 0;
const mongoose_1 = require("mongoose");
const walletsSchema = new mongoose_1.Schema({
    walletID: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: new mongoose_1.Types.ObjectId(),
        unique: true,
        required: true,
    },
    userID: { type: mongoose_1.Schema.Types.ObjectId },
    isGroupedWallet: { type: Boolean, required: true },
    groupedUserIds: [{ type: mongoose_1.Schema.Types.ObjectId }],
    groupAdmin: { type: mongoose_1.Schema.Types.ObjectId },
    lastUpdate: { type: Date, default: Date.now },
    lastTransactionId: { type: mongoose_1.Schema.Types.ObjectId },
    balance: {
        ils: { type: Number, required: true },
        usd: { type: Number, required: true },
        euro: { type: Number, required: true },
    },
});
exports.WalletsModel = (0, mongoose_1.model)("Wallet", walletsSchema);
