"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("../controllers/transaction.controller");
const router = (0, express_1.Router)();
router.get('/', transaction_controller_1.TransactionsController.getTransactions);
router.post('/execute', transaction_controller_1.TransactionsController.executeTransaction);
exports.default = router;
