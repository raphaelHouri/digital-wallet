"use strict";
// client.route.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_controller_1 = require("../controllers/client.controller");
const router = (0, express_1.Router)();
// Define client routes
router.get("/users/:userId", client_controller_1.ClientController.getUserById);
router.get("/wallets/deposit/:walletId", client_controller_1.ClientController.getWalletDeposit);
router.post("/transactions", client_controller_1.ClientController.getTransactions);
router.post("/transactions/execute", client_controller_1.ClientController.sendTransaction);
exports.default = router;
