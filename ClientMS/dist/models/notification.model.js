"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    fromWalletId: { type: String, required: true },
    toWalletId: { type: String, required: true },
    text: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
exports.NotificationModel = (0, mongoose_1.model)("Notification", notificationSchema);
