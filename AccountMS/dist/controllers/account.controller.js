"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const user_model_1 = require("../models/user.model");
const error_utils_1 = require("../utils/error_utils");
const wallet_model_1 = require("../models/wallet.model");
class AccountController {
    static async getUsersData(req, res) {
        // Retrieve user data based on userId
        try {
            const userId = req.params.userId;
            const user = await user_model_1.UserModel.findOne({ userID: userId });
            if (user) {
                const userObj = user.toObject();
                res.json({ data: userObj, status: 200 });
            }
            else {
                res.json({ message: "User not found", status: 404 });
            }
        }
        catch (error) {
            (0, error_utils_1.reportError)({ message: (0, error_utils_1.getErrorMessage)(error) });
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    static async getWalletData(req, res) {
        // Retrieve wallet data based on walletId
        const walletId = req.params.walletId;
        try {
            const wallet = await wallet_model_1.WalletsModel.findOne({ walletID: walletId });
            if (wallet) {
                const walletObj = wallet.toObject();
                res.json({ data: walletObj, status: 200 });
            }
            else {
                res.json({ status: 404, message: "wallet not found" });
            }
        }
        catch (error) {
            (0, error_utils_1.reportError)({ message: (0, error_utils_1.getErrorMessage)(error) });
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
exports.AccountController = AccountController;
