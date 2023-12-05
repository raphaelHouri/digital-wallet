"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_controller_1 = require("../controllers/account.controller");
const router = (0, express_1.Router)();
router.get("/users/:userId", account_controller_1.AccountController.getUsersData);
router.get("/wallets/:walletId", account_controller_1.AccountController.getWalletData);
exports.default = router;
