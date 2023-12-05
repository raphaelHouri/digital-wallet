"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userID: { type: mongoose_1.Schema.Types.ObjectId, default: new mongoose_1.Types.ObjectId, unique: true, required: true },
    mail: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    ID: { type: String, required: true },
    joinedAt: { type: Date, default: Date.now },
    phoneNumber: { type: String },
    singleWalletID: { type: mongoose_1.Schema.Types.ObjectId, default: new mongoose_1.Types.ObjectId, unique: true, required: true },
    groupedWalletIDs: [{ type: mongoose_1.Schema.Types.ObjectId, default: new mongoose_1.Types.ObjectId, unique: true }],
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
