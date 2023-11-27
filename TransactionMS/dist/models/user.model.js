"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userID: { type: String, unique: true, required: true },
    mail: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    ID: { type: String, required: true },
    joinedAt: { type: Date, default: Date.now },
    phoneNumber: { type: String },
    singleWalletId: { type: String },
    groupedWalletIds: [{ type: String }],
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
